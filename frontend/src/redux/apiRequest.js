import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlide";
import {
  deleteUsersFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/api/v1/users/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/api/v1/users/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJwt) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJwt.get("/api/v1/users/", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUsers = async (
  accessToken,
  dispatch,
  id,
  axiosJwt,
  navigate
) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJwt.delete(`/api/v1/users/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });

    dispatch(deleteUsersSuccess());
    navigate("/register");
  } catch (err) {
    dispatch(deleteUsersFailed(err.response?.data));
  }
};

export const logOutUser = async (
  accessToken,
  dispatch,
  navigate,
  axiosJwt,
  id
) => {
  dispatch(loginStart());
  try {
    await axiosJwt.post("/api/v1/users/logout", id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(loginFailed(err.response?.data));
  }
};
