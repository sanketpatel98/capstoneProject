const express = require("express");
const { creatUser, userSignIn } = require("./Firebase/auth_email_link_send");
var cors = require("cors");
const {
  getRecipesByPantry,
  getRecipesInstructionById,
  getRecipeById,
  getRecipeByCuisine,
  getIngredientById
} = require("./spoonacularAPI");
const {
  addToFavourites,
  removefromFavourites,
  getFavouriteRecipes,
} = require("./Firebase/favouriteRecipes");
const { addToCustomRecipes, removefromCustomRecipes, getCustomRecipesById } = require("./Firebase/customRecipeStorage");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/recipesByPantry", async (req, res) => {
  getRecipesByPantry(req.query.ingredients)
    .then((response) => {
      res.send({
        response: response,
      });
    })
    .catch((error) => {
      res.status(400).send(error);
      console.log(error);
    });
});

app.get("/recipeByCuisine", async (req, res) => {
  if (req.query.cuisine) {
    getRecipeByCuisine(req.query.cuisine)
      .then((response) => {
        res.send({
          response: { recipes: response, cuisine: req.query.cuisine },
        });
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  } else {
    res
      .status(400)
      .send("SERVER RESPONSE => Cuisine not found in the query param");
  }
});

app.get("/recipesInstructionById", async (req, res) => {
  getRecipesInstructionById(req.query.id).then((response) => {
    res.send({
      response: response,
    });
  });
});

app.get("/ingredientById", async (req, res) => {
  if (req.query.id) {
    getIngredientById(req.query.id).then((response) => {
      res.send({
        response: response,
      });
    });
  } else {
    res.status(400).send("SERVER RESPONSE => Id not found in the query param");
  }
});

app.get("/recipeById", async (req, res) => {
  if (req.query.id) {
    getRecipeById(req.query.id).then((response) => {
      res.send({
        response: response,
      });
    });
  } else {
    res.status(400).send("SERVER RESPONSE => Id not found in the query param");
  }
});

app.get("/customRecipeById", async (req, res) => {
  if (req.query.id) {
    getCustomRecipesById(req.query.id).then((response) => {
      res.send({
        response: response,
      });
    });
  } else {
    res.status(400).send("SERVER RESPONSE => Id not found in the query param");
  }
});

app.post("/createUser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  creatUser(email, password)
    .then((userCred) => {
      res.send({
        userCred: userCred,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/userSignIn", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userSignIn(email, password)
    .then((response) => {
      res.send({
        response: response,
      });
    })
    .catch((error) => {
      console.log(error);
      // console.log(error.code);
      res.send(error);
    });
});

//Favourite Recipes
app.post("/addFavourite", async (req, res) => {
  const recipeId = req.body.recipeId;
  const uid = req.body.uid;
  addToFavourites(recipeId, uid)
    .then((response) => {
      res.send({
        response: { message: "Recipe added successfully!" },
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/removeFavourite", async (req, res) => {
  const recipeId = req.body.recipeId;
  const uid = req.body.uid;
  removefromFavourites(recipeId, uid)
    .then((response) => {
      res.send({
        response: { message: "Recipe " + recipeId + " removed successfully!" },
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/getAllFavourite", async (req, res) => {
  const uid = req.body.uid;
  console.log("From getAllFavouriteRecipes backend");
  console.log(uid);
  res.send({
    response: await getFavouriteRecipes(uid),
  });
});

//Custom recipes
app.post("/addCustomRecipe", async (req, res) => {
  const customRecipe = req.body.customRecipe;
  const uid = req.body.uid;
  addToCustomRecipes(customRecipe, uid)
    .then((response) => {
      res.send({
        response: { message: "Custom recipe added successfully!" },
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/removeCustom", async (req, res) => {
  const recipeId = req.body.recipeId;
  const uid = req.body.uid;
  removefromCustomRecipes(recipeId, uid)
    .then((response) => {
      res.send({
        response: { message: "Recipe " + recipeId + " removed successfully!" },
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
