import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRef: {},
};

export const userDataSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userRef = action.payload
    },
    logout: (state, action) => {
      state.userRef = {}
    },
  },
});

export const { login, logout } = userDataSclice.actions;

export default userDataSclice.reducer;
