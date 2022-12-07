import { configureStore } from '@reduxjs/toolkit'
import pantryReducer from './pantrySlice'
import cartReducer from './cartSlice'
import userReducer from './userDataSclice'
import favouriteRecipesReducer from './favouriteRecipesSlice'
import customRecipeReducer from './customRecipeSlice'
export const store = configureStore({
  reducer: {
      pantry: pantryReducer,
      cart: cartReducer,
      user: userReducer,
      favourite: favouriteRecipesReducer,
      custom: customRecipeReducer
  },
})