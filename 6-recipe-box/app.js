const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const recipes = require("./recipes")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))

let currentRecipe = 0

app.get("/", (req, res) => {
  res.render("index.ejs", { recipes, currentRecipe })
})

app.get("/:recipeInd", (req, res) => {
  const { recipeInd } = req.params
  currentRecipe = recipeInd
  res.redirect("/")
})

app.listen(port, () => {
  console.log("app listening on port " + port)
})