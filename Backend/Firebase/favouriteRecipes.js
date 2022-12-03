const { database } = require("./Firebase");
const { ref, set, get, push, remove, o } = require("firebase/database");

const path = "https://capstone-project-8ea89-default-rtdb.firebaseio.com";

const addToFavourites = async (recipeId, uid) => {
  //   ref("favouriteRecipes")
  return set(push(ref(database, `users/${uid}/favouriteRecipes/`)), {
    recipeId: recipeId,
  });
};

const removefromFavourites = async (recipeId, uid) => {
  var queryRef = ref(database, `users/${uid}/favouriteRecipes/`);
  get(queryRef).then((snapshot) => {
    var data = snapshot.val();
    if (snapshot.exists()) {
      for (let key in data) {
        if (data[key].recipeId == recipeId) {
          remove(ref(database, `users/${uid}/favouriteRecipes/${key}`))
            .then(() => {})
            .catch((err) => {
              console.log("Error:" + error);
            });
        }
      }
    }
  });
};

const getFavouriteRecipes = async (uid) => {
  var queryRef = ref(database, `users/${uid}/favouriteRecipes/`);
  var responseData = [];
  await get(queryRef).then((snapshot) => {
    var data = snapshot.val();
    if (snapshot.exists()) {
      for (let key in data) {
        console.log(data[key].recipeId);
        responseData.push(data[key].recipeId);
      }
    }
  });
  return responseData
};

module.exports = {
  addToFavourites: addToFavourites,
  removefromFavourites: removefromFavourites,
  getFavouriteRecipes: getFavouriteRecipes,
};
