"use strict";
const { User } = require("../../models");

const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

const getUserName = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const getListUser = async () => {
  try {
    const listUser = await User.findAll();
    return listUser;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createUser,
  getUserName,
  getListUser,
  deleteUser,
  getUserById,
};
