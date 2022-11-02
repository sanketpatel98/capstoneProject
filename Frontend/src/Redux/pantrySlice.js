import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}

export const pantrySlice = createSlice({
  name: 'pantry',
  initialState,
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload)
    },
  },
})

export const { add } = pantrySlice.actions

export default pantrySlice.reducer