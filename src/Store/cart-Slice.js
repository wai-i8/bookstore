import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalNumber: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalNumber = action.payload.totalNumber;
    },
    addItem(state, action) {
      const id = action.payload.key;
      const indexOfExistedItem = +state.items.findIndex(
        (item) => item.key === id
      );
      if (indexOfExistedItem === -1) {
        state.items.push(action.payload);
      } else {
        state.items[indexOfExistedItem].quantity =
          state.items[indexOfExistedItem].quantity + action.payload.quantity;
      }
      state.totalNumber = state.totalNumber + action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteAllItem(state) {
      state.items = [];
      state.totalNumber = 0;
      localStorage.removeItem("cart");
    },
    decreaseItem(state, action) {
      const id = action.payload;
      const indexOfExistedItem = +state.items.findIndex(
        (item) => item.key === id
      );
      state.items[indexOfExistedItem].quantity--;
      if (state.items[indexOfExistedItem].quantity === 0) {
        state.items = state.items.filter((item) => {
          return item !== state.items[indexOfExistedItem];
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseItem(state, action) {
      const id = action.payload;
      const indexOfExistedItem = +state.items.findIndex(
        (item) => item.key === id
      );
      state.items[indexOfExistedItem].quantity++;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
