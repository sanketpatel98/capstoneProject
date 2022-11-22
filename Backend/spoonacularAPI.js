const axios = require("axios");

const API_KEYS = ['cd00f5560c0e40a4bc20c6c69776e170','8ba13912526d472ea42caafced0c2fa9','647fdb3776dc469794d7db52e588a636','6cf1d983c37540d6b13ee6c9d9caef7f','7b6f91eab8184d10aa0dd7bd6c1e6191']
const API_KEY = API_KEYS[4]

const getRecipesByPantry = async (ingredients) => {
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
    ).then((response) => {
        return response.data
    })
};

const getRecipesInstructionById = async (id) => {
    return await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
      ).then((response) => {
          return response.data
      })
  };

const getRecipeById = async (id) => {
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    ).then((response) => {
        return response.data
    })
};

module.exports = {
    getRecipesByPantry: getRecipesByPantry,
    getRecipesInstructionById: getRecipesInstructionById,
    getRecipeById: getRecipeById
};
