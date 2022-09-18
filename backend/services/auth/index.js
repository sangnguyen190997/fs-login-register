"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = bcrypt.hash(password, salt);
  return hashed;
};

const comparePassword = async (password, passwordHashed) => {
  const isMatch = bcrypt.compare(password, passwordHashed);
  return isMatch;
};

const genToken = async (data) => {
  const token = jwt.sign(data, process.env.JWT_ACCESS_KEY, {
    expiresIn: "20s",
  });
  return token;
};

const verifyToken = async (token) => {
  const verify = jwt.verify(token, process.env.JWT_ACCESS_KEY);
  return verify;
};

const genrefreshToken = async (data) => {
  const refresh = jwt.sign(data, process.env.JWT_REFRESH_KEY, {
    expiresIn: "365d",
  });
  return refresh;
};

module.exports = {
  hashPassword,
  comparePassword,
  genToken,
  verifyToken,
  genrefreshToken,
};
