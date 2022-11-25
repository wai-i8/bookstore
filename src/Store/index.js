import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-Slice";
import authSlice from "./auth-Slice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, auth: authSlice.reducer },
});

export default store;
