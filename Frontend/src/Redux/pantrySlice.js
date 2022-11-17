import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const pantrySlice = createSlice({
  name: "pantry",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      // const index = state.list.indexOf(action.payload);
      for (let index = 0; index < state.list.length; index++) {
        const element = state.list[index];
        if (element[1] == action.payload) {
          state.list.splice(index, 1);
          break;
        }
      }

      // const index = state.list.filter((ingredient) => ingredient[1] == action.payload )
      // if (index > -1) {
      //   // only splice array when item is found
      //   state.list.splice(index, 1); // 2nd parameter means remove one item only
      // }
      // state.list.
    },
  },
});

export const { add, remove } = pantrySlice.actions;

export default pantrySlice.reducer;
