const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const recipes = require("./recipes")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")


app.get("/", (req, res) => {
  res.render("index.ejs", { recipes })
})

app.listen(port, () => {
  console.log("app listening on port " + port)
})