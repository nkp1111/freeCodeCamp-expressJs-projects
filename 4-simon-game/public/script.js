const OnOffBtn = document.querySelector(".on-off-btn")
const displayEl = document.querySelector(".display")
const startBtn = document.querySelector(".radio-switch")
const startLabel = document.querySelector(".radio-switch-label")

let score = 0
let initialWaitTime = 1000

let gameChoiceList = ["red", "green", "blue", "yellow"]
let boxes = document.querySelectorAll(".color-box")
let choices = ["red", "green", "blue", "yellow"]

showDisplay()

// make the game on and off 
OnOffBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("on")) {
    e.target.classList.remove("on")
    e.target.classList.add("off")
    gameChoiceList = []
  } else {
    e.target.classList.add("on")
    e.target.classList.remove("off")
    gameStart()
  }
})

function gameStart() {
  // after the game is on it started the game
  showDisplay()
  startBtn.addEventListener("click", updateStart)
  startLabel.addEventListener("click", updateStart)
}

function showDisplay() {
  // after score change update score
  displayEl.innerText = score
}

function updateStart() {
  // start button start and stop the current game
  if (startLabel.innerText == "START") {
    startLabel.innerText = "STOP"
    startBtn.style.background = "green"
    playGame()
  } else {
    startLabel.innerText = "START"
    startBtn.style.background = "red"
  }
}

function playGame() {
  // start the game play show colors
  getRandomColor()
  showColors(0)
}

function getRandomColor() {
  // get random colors from the give choices
  const currentChoice = Math.floor(Math.random() * 4)
  gameChoiceList.push(choices[currentChoice])
}

function showColors(current) {
  // Brighten the current colors
  for (let box of boxes) {
    if (box.classList.contains(`${gameChoiceList[current]}-box`)) {
      box.classList.add("select")
    }

    setTimeout(function () {
      box.classList.remove("select")
      if (current < gameChoiceList.length - 2) {
        showColors(current + 1)
      } else {
        hearResponse()
      }
    }, initialWaitTime)
  }
}


function hearResponse() {
  // hear user response 
}