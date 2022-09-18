const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticate, verifyTokenAndAdmin } = require("../../middlewares/auth");
const {
  hashPassword,
  comparePassword,
  genToken,
  genrefreshToken,
} = require("../../services/auth");
const {
  createUser,
  getUserName,
  getListUser,
  deleteUser,
  getUserById,
} = require("../../services/users");

const userRouter = express.Router();

let refreshTokens = [];

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await createUser({ username, email, password: hashedPassword });

  if (!user) {
    return res.status(500).send("Can't create user");
  }

  res.status(200).send(user);
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserName(username);

  if (!user) {
    return res.status(404).send("Wrong username!");
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    return res.status(404).send("Wrong password!");
  }

  if (user && isValidPassword) {
    const token = await genToken({ id: user.id, admin: user.admin });
    const refresh = await genrefreshToken({ id: user.id, admin: user.admin });
    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    refreshTokens.push(refresh);
    const { password, ...others } = user.dataValues;
    res.status(200).send({ ...others, token });
  }
});

userRouter.get("/", [authenticate], async (req, res) => {
  const listUser = await getListUser();

  if (!listUser) {
    return res.status(500).send("Can't get list user");
  }

  res.status(200).send(listUser);
});

userRouter.delete(
  "/:id",
  [authenticate, verifyTokenAndAdmin],
  async (req, res) => {
    const { id } = req.params;

    const isUserExists = await getUserById(id);

    if (!isUserExists) {
      return res.status(500).send(`User id: ${id} is not exists `);
    }

    const userdeleted = await deleteUser(id);

    res.status(200).send(`Delete user id: ${userdeleted} successfully`);
  }
);

userRouter.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send("You're not authenticate");
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send("Refresh token is not valid");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
    if (err) {
      console.log(err);
    }

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = await genToken({ id: user.id, admin: user.admin });
    const newRefreshToken = await genrefreshToken({
      id: user.id,
      admin: user.admin,
    });

    refreshTokens.push(newRefreshToken);

    res.cookie("RefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    res.status(200).send({ accessToken: newAccessToken });
  });
});

userRouter.post("/logout", [authenticate], (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.status(200).send("Log out is successfully");
});

module.exports = userRouter;
