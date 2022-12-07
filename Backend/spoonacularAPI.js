const axios = require("axios");

const API_KEYS = [
  "0b07a05337f547c38f53cbc934991d01",
  "8e5e2134256f4e4ebde7517ade96832a",
  "cd00f5560c0e40a4bc20c6c69776e170",
  "8ba13912526d472ea42caafced0c2fa9",
  "647fdb3776dc469794d7db52e588a636",
  "6cf1d983c37540d6b13ee6c9d9caef7f",
  "7b6f91eab8184d10aa0dd7bd6c1e6191",
  "7f4523feb8fb437f9d3332517567974c",
  "108301908c134907af3370904d8332b4",
  "1cbf2d7f00c241289e887bded81927ba",
];
var API_KEY_SELECTOR = 0;

const getRecipesByPantry = async (ingredients) => {
  const API_KEY = API_KEYS[API_KEY_SELECTOR];
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (err) => {
      console.log(err.message);
      if (err.message == "Request failed with status code 402") {
        API_KEY_SELECTOR++;
        if (API_KEY_SELECTOR >= API_KEYS.length) {
          API_KEY_SELECTOR = API_KEY_SELECTOR % API_KEYS.length;
        }
        console.log(`API ${API_KEY_SELECTOR} is Selected!`);
        return await getRecipesByPantry(ingredients);
      }
      return err;
    });
};

const getRecipesInstructionById = async (id) => {
  const API_KEY = API_KEYS[API_KEY_SELECTOR];
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (err) => {
      console.log(err.message);
      if (err.message == "Request failed with status code 402") {
        API_KEY_SELECTOR++;
        if (API_KEY_SELECTOR >= API_KEYS.length) {
          API_KEY_SELECTOR = API_KEY_SELECTOR % API_KEYS.length;
        }
        console.log(`API ${API_KEY_SELECTOR} is Selected!`);
        return await getRecipesInstructionById(id);
      }
      return err;
    });
};

const getRecipeById = async (id) => {
  const API_KEY = API_KEYS[API_KEY_SELECTOR];
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (err) => {
      console.log(err.message);
      if (err.message == "Request failed with status code 402") {
        API_KEY_SELECTOR++;
        if (API_KEY_SELECTOR >= API_KEYS.length) {
          API_KEY_SELECTOR = API_KEY_SELECTOR % API_KEYS.length;
        }
        console.log(`API ${API_KEY_SELECTOR} is Selected!`);
        return await getRecipeById(id);
      }
      return err;
    });
};

const getIngredientById = async (id) => {
  const API_KEY = API_KEYS[API_KEY_SELECTOR];
  return await axios
    .get(
      `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${API_KEY}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (err) => {
      console.log(err.message);
      if (err.message == "Request failed with status code 402") {
        API_KEY_SELECTOR++;
        if (API_KEY_SELECTOR >= API_KEYS.length) {
          API_KEY_SELECTOR = API_KEY_SELECTOR % API_KEYS.length;
        }
        console.log(`API ${API_KEY_SELECTOR} is Selected!`);
        return await getIngredientById(id);
      }
      return err;
    });
};

const getRecipeByCuisine = async (cuisine) => {
  const API_KEY = API_KEYS[API_KEY_SELECTOR];
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&cuisine=${cuisine}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(async (err) => {
      console.log(err.message);
      if (err.message == "Request failed with status code 402") {
        API_KEY_SELECTOR++;
        if (API_KEY_SELECTOR >= API_KEYS.length) {
          API_KEY_SELECTOR = API_KEY_SELECTOR % API_KEYS.length;
        }
        console.log(`API ${API_KEY_SELECTOR} is Selected!`);
        return await getRecipeByCuisine(cuisine);
      }
      return err;
    });
};

module.exports = {
  getRecipesByPantry: getRecipesByPantry,
  getRecipesInstructionById: getRecipesInstructionById,
  getRecipeById: getRecipeById,
  getRecipeByCuisine: getRecipeByCuisine,
  getIngredientById: getIngredientById,
};
