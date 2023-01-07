const express = require("express")

let app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(express.static("public"))

let playMode
let choice
let gameStart

app.get("/", (req, res) => {
  res.render("index", {
    playMode,
    choice,
    gameStart
  })
})

app.get("/selectMode/:mode", (req, res) => {
  if (req.params.mode == "1") {
    playMode = "Computer"
  } else if (req.params.mode == "2") {
    playMode = "Human"
  }
  res.redirect("/")
})

app.get("/back", (req, res) => {
  playMode = undefined
  choice = undefined
  res.redirect("/")
})

app.get("/gameStart/:choice", (req, res) => {
  choice = req.params.choice
  gameStart = true
  res.redirect("/")
})

app.get("/startAgain", (req, res) => {
  playMode = undefined
  choice = undefined
  gameStart = undefined
  res.redirect("/")
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
})