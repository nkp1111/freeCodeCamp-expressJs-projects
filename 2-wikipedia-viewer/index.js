const express = require("express")
const axios = require("axios")
const app = express()

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


const getArticle = (target) => {
  var url = "https://en.wikipedia.org/w/api.php";

  let params = {
    action: "opensearch",
    search: target,
    limit: "10",
    namespace: "0",
    format: "json",
    explaintext: true,
    exsentences: 1
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

  return axios.get(url)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) { console.log(error); });
}


app.get("/", (req, res) => {
  res.render("index", { titles: '' })
})

app.get("/article", async (req, res) => {
  const { title } = req.query
  let article = await getArticle(title)
  console.log(article);
  let titles = article[1]
  let links = article[3]
  res.render("index", { titles, links })
})

app.listen("3000", () => {
  console.log("On port 3000");
})