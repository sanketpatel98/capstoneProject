const { database } = require("./Firebase");
const { ref, set, get, push, remove } = require("firebase/database");

const path = "https://capstone-project-8ea89-default-rtdb.firebaseio.com";

const addToCustomRecipes = async (recipe, uid) => {
  //   ref("favouriteRecipes")
  return set(push(ref(database, `customRecipes/`)), {
    recipe: recipe,
    uid: uid
  });
};

const removefromCustomRecipes = async (recipeId, uid) => {
  var queryRef = ref(database, `customRecipes/`);
  get(queryRef).then((snapshot) => {
    var data = snapshot.val();
    if (snapshot.exists()) {
      for (let key in data) {
        if (data[key].uid == uid && data[key].recipe.id == recipeId) {
          remove(ref(database, `customRecipes/${key}`))
            .then(() => {})
            .catch((err) => {
              console.log("Error:" + error);
            });
        }
      }
    }
  });
};

const getCustomRecipesByUid = async (uid) => {
  var queryRef = ref(database, `customRecipes/`);
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
  addToCustomRecipes: addToCustomRecipes,
  removefromCustomRecipes: removefromCustomRecipes,
  getCustomRecipesByUid: getCustomRecipesByUid,
};
