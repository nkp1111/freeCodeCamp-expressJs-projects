const express = require('express')
const axios = require('axios')
var geoip = require('geoip-lite');
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

const url = 'https://weather-proxy.freecodecamp.rocks/api/current'

const getWeather = (url, lat, lon) => {
  let latLong = `?lat=${lat}&lon=${lon}`
  return axios.get(url + latLong)
    .then(data => data.data)
    .catch(err => {
      console.log(err)
    })
}

app.get('/', async (req, res) => {
  let weather
  let ip = req.headers['x-real-ip'] || req.connection.remoteAddress
  ip = '192.212.174.101'
  const location = geoip.lookup(ip)
  const lat = location.ll[0]
  const lon = location.ll[1]
  weather = await getWeather(url, lat, lon)
  console.log(weather, weather.weather);
  res.render('index', { weather })
})

app.listen('3000', () => {
  console.log('App on port 3000');
})