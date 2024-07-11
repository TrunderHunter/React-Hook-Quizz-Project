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
      console.log(">>>>> Check action: ", action);
      state.account = {
        accessToken: action?.payload?.access_token,
        refreshToken: action?.payload?.refresh_token,
        username: action?.payload?.username,
        image: action?.payload?.image,
        role: action?.payload?.role,
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
