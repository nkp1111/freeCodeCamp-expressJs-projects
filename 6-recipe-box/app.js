const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const store = require("store2")
let baseRecipes = require("./recipes")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))

// variables
let currentRecipe = 0
let to_delete = false
let to_edit = false
let to_add = false
let recipes

if (store.get("recipes")) {
  recipes = JSON.parse(store.get("recipes"))
} else {
  recipes = baseRecipes
  store.set("recipes", JSON.stringify(recipes))
}

app.get("/", (req, res) => {
  res.render("index.ejs", { recipes, currentRecipe, to_delete, to_add, to_edit })
})

app.get("/delete/:state", (req, res) => {
  const { state } = req.params
  switch (state) {
    case "start":
      to_delete = true
      break;
    case "confirm":
      recipes = [...recipes.slice(0, currentRecipe)]
      if (recipes.length > 1) {
        currentRecipe = 0
        recipes = [...recipes, ...recipes.slice(currentRecipe + 1,)]
      } else {
        currentRecipe = undefined
      }
      to_delete = false
      break;

    default:
      to_delete = false
      break;
  }
  res.redirect("/")
})

app.get("/edit/:state", (req, res) => {
  const { state } = req.params
  const { name, ingredient, direction } = req.query
  switch (state) {
    case "start":
      to_edit = true
      break;
    case "confirm":
      let ingredients = ingredient.split(" / ")
      let directions = direction.split(" / ")
      recipes[currentRecipe].recipe = name
      recipes[currentRecipe].ingredients = ingredients
      recipes[currentRecipe].directions = directions
      to_edit = false
      break;

    default:
      to_edit = false
      break;
  }
  res.redirect("/")
})

app.get("/add/:state", (req, res) => {
  const { state } = req.params
  const { name, ingredient, direction } = req.query
  switch (state) {
    case "start":
      to_add = true
      break;
    case "confirm":
      const ingredients = ingredient.split(" / ")
      const directions = direction.split(" / ")
      const newRecipe = { recipe: name, ingredients, directions }
      recipes.push(newRecipe)
      if (!currentRecipe) {
        currentRecipe = 0
      }
      to_add = false
      break;

    default:
      to_add = false
      break;
  }
  res.redirect("/")
})

const isNumeric = (str) => {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

app.get("/:recipeInd", (req, res) => {
  const { recipeInd } = req.params
  if (isNumeric(recipeInd) && recipes.length > +recipeInd) {
    currentRecipe = recipeInd
  }
  res.redirect("/")
})

app.listen(port, () => {
  console.log("app listening on port " + port)
})