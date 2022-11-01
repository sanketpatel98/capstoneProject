const express = require("express");
var axios = require("axios");
var cors = require("cors");
const {
  getRecipesByPantry,
  getRecipesInstructionById,
  getRecipeById,
} = require("./spoonacularAPI");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/recipesByPantry", async (req, res) => {
  //   axios.get("https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=8ba13912526d472ea42caafced0c2fa9").then((response) => {
  //     res.send(response.status);
  //   });
  getRecipesByPantry()
    .then((response) => {
      //   console.log(JSON.stringify(response));
      console.log("Request for getRecipesByPantry");
      res.send({
        response: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/recipesInstructionById", async (req, res) => {
  console.log(req.query.id);
  getRecipesInstructionById(req.query.id).then((response) => {
    console.log("Request for getRecipesInstructionById");
    res.send({
      response: response,
    });
  });
});

app.get("/recipeById", async (req, res) => {
  console.log(req.query.id);
  if (req.query.id) {
    getRecipeById(req.query.id).then((response) => {
      console.log("Request for getRecipeById");
      res.send({
        response: response,
      });
    });  
  } else {
    res.status(400).send("SERVER RESPONSE => Id not found in the query param")
  }
  
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
