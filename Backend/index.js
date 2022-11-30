const express = require("express");
var cors = require("cors");
const {
  getRecipesByPantry,
  getRecipesInstructionById,
  getRecipeById,
  getRecipeByCuisine
} = require("./spoonacularAPI");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/recipesByPantry", async (req, res) => {
  getRecipesByPantry(req.query.ingredients)
    .then((response) => {
      res.send({
        response: response,
      });
    })
    .catch((error) => {
      res.status(400).send(error)
      console.log(error);
    });
});

app.get("/recipeByCuisine", async (req, res) => {
  if (req.query.cuisine) {
    getRecipeByCuisine(req.query.cuisine)
    .then((response) => {
      res.send({
        response: {recipes:response, cuisine:req.query.cuisine},
      });
    })
    .catch((error) => {
      res.status(400).send(error)
      console.log(error);
    });
  } else {
    res.status(400).send("SERVER RESPONSE => Cuisine not found in the query param")
  }
});

app.get("/recipesInstructionById", async (req, res) => {
  getRecipesInstructionById(req.query.id).then((response) => {
    res.send({
      response: response,
    });
  });
});

app.get("/recipeById", async (req, res) => {
  if (req.query.id) {
    getRecipeById(req.query.id).then((response) => {
      res.send({
        response: response,
      });
    });  
  } else {
    res.status(400).send("SERVER RESPONSE => Id not found in the query param")
  }
  
});
app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
