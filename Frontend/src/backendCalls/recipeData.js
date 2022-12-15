import axios from "axios";
import API_URL from "./backendAddress";

// const API_URL =
//     Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

// const API_URL = "http://18.191.17.41:3000"

// const API_URL = 'https://capstoneprojectlevelthree.herokuapp.com'

export const getRecipebyPantry = (pantry) => {
  const pantryQuery = pantry.map((ingredient) => ingredient[0].replace(" ", "+"))
  return axios
    .get(`${API_URL}/recipesByPantry?ingredients=${pantryQuery.toString()}`)
    .then((response) => response.data.response)
    .catch((error) => {
      console.log(error);
    });
};

export const getRecipeInstructionById = (id) => {
    // recipesInstructionById
  return axios
    .get(`${API_URL}/recipesInstructionById?id=${id}`)
    .then((response) => response.data.response)
    .catch((error) => {
      console.log(error);
    });
};

export const getRecipeById = (id) => {
  // recipeById
return axios
  .get(`${API_URL}/recipeById?id=${id}`)
  .then((response) => response.data.response)
  .catch((error) => {
    console.log(error);
  });
};

export const getIngredientById = (id) => {
  // recipeById
return axios
  .get(`${API_URL}/ingredientById?id=${id}`)
  .then((response) => response.data.response)
  .catch((error) => {
    console.log(error);
  });
};

export const getRecipeByCuisine = (cuisine) => {
  // recipeByCuisine
return axios
  .get(`${API_URL}/recipeByCuisine?cuisine=${cuisine}`)
  .then((response) => response.data.response)
  .catch((error) => {
    console.log(error);
  });
};
