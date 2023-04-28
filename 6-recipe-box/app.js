const express = require("express")
const app = express()
const port = process.env.PORT || 3000
let recipes = require("./recipes")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))

let currentRecipe = 0
let to_delete = false

app.get("/", (req, res) => {
  res.render("index.ejs", { recipes, currentRecipe, to_delete })
})

app.get("/delete/:state", (req, res) => {
  const { state } = req.params
  switch (state) {
    case "start":
      to_delete = true
      break;
    case "confirm":
      recipes = [...recipes.slice(0, currentRecipe), ...recipes.slice(currentRecipe + 1,)]
      to_delete = false
      break;

    default:
      to_delete = false
      break;
  }

  res.redirect("/")
})

app.get("/edit", (req, res) => {
  console.log("edit")
  res.redirect("/")
})

app.get("/add", (req, res) => {
  console.log("add")
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