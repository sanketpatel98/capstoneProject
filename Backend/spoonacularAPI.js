const axios = require("axios");

const API_KEY = '8ba13912526d472ea42caafced0c2fa9'

const getRecipesByPantry = async () => {
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=carrots,tomatoes&apiKey=${API_KEY}`
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
