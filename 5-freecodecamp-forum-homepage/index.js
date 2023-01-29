const { default: axios } = require("axios")
const express = require("express")
const app = express()

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

const freecodecampForumUrl = "https://forum-proxy.freecodecamp.rocks/latest"

const getData = async () => {
  return await axios.get(freecodecampForumUrl).then(data => {
    return data.data
  })
}

const formatDate = (date) => {
  // format time
  let unit = "M"
  let timeDiff = (new Date() - new Date(date)) / (1000 * 60)

  if (timeDiff > 60 * 24) {
    timeDiff = timeDiff / (60 * 24)
    unit = "D"
  } else if (timeDiff > 60) {
    timeDiff = timeDiff / 60
    unit = "H"
  }
  return Math.round(timeDiff) + unit
}

const formatUser = (users, item) => {
  let cUser
  users.forEach(user => {
    if (user.id === item.user_id) {
      cUser = {
        id: user.id,
        name: user.username,
        img: user.avatar_template.startsWith("https")
          ? user.avatar_template.replace("{size}", "135")
          : "https://www.freecodecamp.org/forum" + user.avatar_template.replace("{size}", "135")
      }
    }
  })
  return cUser
}

const formatData = (topics, users) => {
  return topics.map(item => {
    let userArr = []
    let last_updated = formatDate(item.last_posted_at)
    item.posters.map(item => {
      let cUser = formatUser(users, item)
      userArr.push(cUser)
    })
    return {
      id: item.id,
      title: item.title,
      reply_count: item.reply_count,
      posts_count: item.posts_count,
      views: item.views,
      last_updated,
      users: userArr,
    }
  })
}

app.get("/", async (req, res) => {
  let result = await getData()
  let users = result.users
  let topics = result.topic_list.topics
  let posts = formatData(topics, users)
  res.render("index", { posts })
})


app.listen(3000, () => {
  console.log("Listening on port 3000")
})