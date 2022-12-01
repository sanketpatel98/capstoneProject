import { configureStore } from '@reduxjs/toolkit'
import pantryReducer from './pantrySlice'
import cartReducer from './cartSlice'
import userReducer from './userDataSclice'
export const store = configureStore({
  reducer: {
      pantry: pantryReducer,
      cart: cartReducer,
      user: userReducer
  },
})