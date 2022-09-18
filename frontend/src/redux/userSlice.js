import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUser: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },

    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUser = action.payload;
    },

    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUser = action.payload;
      state.msg = action.payload;
    },
    deleteUsersFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUserStart,
  deleteUsersSuccess,
  deleteUsersFailed,
} = userSlice.actions;

export default userSlice.reducer;
