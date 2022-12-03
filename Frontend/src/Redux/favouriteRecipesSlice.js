import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const favouriteRecipesSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromFavourite: (state, action) => {
      // const index = state.list.indexOf(action.payload);
      for (let index = 0; index < state.list.length; index++) {
        const element = state.list[index];
        if (element == action.payload) {
          state.list.splice(index, 1);
          break;
        }
      }
    },
    setFavourite: (state, action) => {
      state.list = action.payload
    }
  },
});

export const { addToFavourite, removeFromFavourite, setFavourite } = favouriteRecipesSlice.actions;

export default favouriteRecipesSlice.reducer;
