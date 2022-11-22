import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const cartSlice = createSlice({
  name: "pantry",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // const index = state.list.indexOf(action.payload);
      for (let index = 0; index < state.list.length; index++) {
        const element = state.list[index];
        if (element.name == action.payload) {
          state.list.splice(index, 1);
          break;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
