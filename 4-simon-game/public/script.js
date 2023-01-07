const OnOffBtn = document.querySelector(".on-off-btn")
const displayEl = document.querySelector(".display")
const startBtn = document.querySelector(".radio-switch")
const startLabel = document.querySelector(".radio-switch-label")
let score = 0

showDisplay()

// clicks game on off 
OnOffBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("on")) {
    e.target.classList.remove("on")
    e.target.classList.add("off")
  } else {
    e.target.classList.add("on")
    e.target.classList.remove("off")
    gameStart()
  }
})


function gameStart() {
  showDisplay()
  startBtn.addEventListener("click", updateStart)
  startLabel.addEventListener("click", updateStart)
}

function showDisplay() {
  displayEl.innerText = score
}

function updateStart() {
  if (startLabel.innerText == "START") {
    startLabel.innerText = "STOP"
    startBtn.style.background = "green"
  } else {
    startLabel.innerText = "START"
    startBtn.style.background = "red"
    playGame()
  }
}

function playGame() {

}