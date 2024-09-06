import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    accessToken: null,
    refreshToken: null,
    username: null,
    image: null,
    role: null,
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.account = {
        username: action?.payload?.username,
        email: action?.payload?.email,
        role: action?.payload?.role,
        accessToken: action?.payload?.access_token,
        refreshToken: action?.payload?.refresh_token,
        image: action?.payload?.image,
      };
      state.isAuth = true;
    },
    logout: (state) => {
      state.account = {
        accessToken: null,
        refreshToken: null,
        username: null,
      };
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
