import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

export const deeplinkSclice = createSlice({
  name: "deeplink",
  initialState,
  reducers: {
    changeId: (state, action) => {
      state.id = action.payload
    },
  },
});

export const { changeId } = deeplinkSclice.actions;

export default deeplinkSclice.reducer;
