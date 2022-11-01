import axios from "axios";

const API_URL =
    Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const getRecipebyPantry = () => {
  return axios
    .get(`${API_URL}/recipesByPantry`)
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
