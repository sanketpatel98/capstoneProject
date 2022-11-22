import { configureStore } from '@reduxjs/toolkit'
import pantryReducer from './pantrySlice'
import cartReducer from './cartSlice'
export const store = configureStore({
  reducer: {
      pantry: pantryReducer,
      cart: cartReducer
  },
})