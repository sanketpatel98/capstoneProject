import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const customRecipeSlice = createSlice({
  name: "custom",
  initialState,
  reducers: {
    addToCustom: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromCustom: (state, action) => {
      // const index = state.list.indexOf(action.payload);
      for (let index = 0; index < state.list.length; index++) {
        const element = state.list[index];
        if (element.id == action.payload) {
          state.list.splice(index, 1);
          break;
        }
      }
    },
    // setFavourite: (state, action) => {
    //   state.list = action.payload
    // }
  },
});

export const { addToCustom, removeFromCustom  } = customRecipeSlice.actions;

export default customRecipeSlice.reducer;
