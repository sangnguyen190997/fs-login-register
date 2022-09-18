import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
  },

  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },

    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },

    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.isSuccess = true;
    },

    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.isSuccess = false;
    },

    logOutStart: (state) => {
      state.login.isFetching = true;
    },

    logOutSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
    },

    logOutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} = authSlice.actions;
export default authSlice.reducer;
