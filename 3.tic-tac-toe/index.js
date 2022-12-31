const express = require("express")

let app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index", { mode: true, gameStart: false })
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
})