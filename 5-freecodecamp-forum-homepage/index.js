const { default: axios } = require("axios")
const express = require("express")
const app = express()

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

const freecodecampForumUrl = "https://forum-proxy.freecodecamp.rocks/latest"

const getData = async () => {
  return await axios.get(freecodecampForumUrl).then(data => {
    // console.log(data.data)
    return data.data
  })
}

app.get("/", async (req, res) => {
  let result = await getData()
  let users = result.users
  let topics = result.topic_list.topics
  console.log(topics)
  res.render("index", topics, users)
})




app.listen(3000, () => {
  console.log("Listening on port 3000")
})