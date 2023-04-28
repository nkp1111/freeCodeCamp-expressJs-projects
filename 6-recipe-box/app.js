const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const recipes = require("./recipes")


app.get("/", (req, res) => {
  res.json(recipes)
})

app.listen(port, () => {
  console.log("app listening on port " + port)
})