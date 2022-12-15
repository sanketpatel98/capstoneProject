import axios from "axios";
import API_URL from "./backendAddress";
// const API_URL =
//     Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

// const API_URL = "http://18.191.17.41:3000"

// const API_URL = 'https://capstoneprojectlevelthree.herokuapp.com'

export const addFavouriteRecipe = (recipeId, uid) => {
    // recipesInstructionById
    return axios({
      method: 'post',
      url: `${API_URL}/addFavourite`,
      data: {
        recipeId: recipeId,
        uid: uid
      }
    })
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  };


export const removeFromFavouriteRecipe = (recipeId, uid) => {
    // recipesInstructionById
    return axios({
      method: 'post',
      url: `${API_URL}/removeFavourite`,
      data: {
        recipeId: recipeId,
        uid: uid
      }
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
      method: 'post',
      url: `${API_URL}/getAllFavourite`,
      data: {
        uid: uid
      }
    })
      .then((response) => response)
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
