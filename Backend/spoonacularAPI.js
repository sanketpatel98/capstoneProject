const axios = require("axios");

const API_KEYS = [
  "a3dc0148757e4b49876bbaeb9c7f0a85",
  "97dfeef9e511454ba6b2134a91a7fdc7",
  "50994bf4502648e08e202023bc84cc7e",
  "9cc0b6d7fbe549f1b700c98a5f0cdbeb",
  "c790bc84e45b4617861a0582647f09ae",
  "245905eab19944018c16bd1524f05a9c",
  "1a7cb06c74374711aadba25f759df33d",
  "fb5412531db64777b351415feb457bdb",
  "dfdf52e9cd3f4b959aedbc8375edb361",
  "dd1b887d29104959b05f30f1abc0d3a0",

  "7b6f91eab8184d10aa0dd7bd6c1e6191",
  "7f4523feb8fb437f9d3332517567974c",
  "108301908c134907af3370904d8332b4",
  "1cbf2d7f00c241289e887bded81927ba",
  "0b07a05337f547c38f53cbc934991d01",
  "8e5e2134256f4e4ebde7517ade96832a",
  "cd00f5560c0e40a4bc20c6c69776e170",
  "8ba13912526d472ea42caafced0c2fa9",
  "647fdb3776dc469794d7db52e588a636",
  "6cf1d983c37540d6b13ee6c9d9caef7f",
];
var API_KEY_SELECTOR = 0;

const getRecipesByPantry = async (ingredients) => {
  const API_KEY = API_KEYS[API_KEY_SELECTOR];
  return await axios
    .get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
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
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
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
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
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
      `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${API_KEY}`,
      {
        headers: { "Accept-Encoding": "gzip,deflate,compress" },
      }
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
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&cuisine=${cuisine}`;
  return await axios
    .get(url, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    })
    .then((response) => {
      return response.data;
    })
    .catch(async (err) => {
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
