import axios from "axios";

// const API_URL =
//   Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

  const API_URL = "http://3.15.46.15:3000"

// const API_URL = 'https://capstoneprojectlevelthree.herokuapp.com'

export const addCustomRecipe = (customRecipe, uid) => {
  // recipesInstructionById
  return axios({
    method: "post",
    url: `${API_URL}/addCustomRecipe`,
    data: {
      customRecipe: customRecipe,
      uid: uid,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const removeFromCustomRecipe = (recipeId, uid) => {
  // recipesInstructionById
  return axios({
    method: "post",
    url: `${API_URL}/removeCustom`,
    data: {
      recipeId: recipeId,
      uid: uid,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const getAllFavouriteRecipes = (uid) => {
  // recipesInstructionById
  console.log(uid);
  return axios({
    method: "post",
    url: `${API_URL}/getAllFavourite`,
    data: {
      uid: uid,
    },
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const getCustomRecipeById = (id) => {
  return axios
    .get(`${API_URL}/customRecipeById?id=${id}`)
    .then((response) => response.data.response)
    .catch((error) => {
      console.log(error);
    });
  };

//   export const getAllFavouriteRecipes = (uid) => {
//     // recipesInstructionById
//   return axios
//     .get(`${API_URL}/getAllFavourite`,{data: {uid:uid}})
//     .then((response) => response)
//     .catch((error) => {
//       console.log(error);
//     });
