import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userId: "",
  isLoggedIn: false,
  expirationTime: undefined,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, action) {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + action.payload.expiresIn * 1000;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expirationTime = new Date(expirationTime).getTime();
      state.isLoggedIn = true;
      localStorage.setItem("loginInfo", JSON.stringify(state));
    },
    logout(state) {
      state.token = "";
      state.userId = "";
      state.refreshToken = "";
      state.expirationTime = undefined;
      state.isLoggedIn = false;
      localStorage.removeItem("loginInfo");
    },
    doNothing(state) {},
  },
});

export const authAction = authSlice.actions;

export default authSlice;
