const OnOffBtn = document.querySelector(".on-off-btn")
const displayEl = document.querySelector(".display")
const startBtn = document.querySelector(".radio-switch")
const startLabel = document.querySelector(".radio-switch-label")

let score
let initialWaitTime = 1000

// add items on list as game goes on
let gameChoiceList = []
// user response refreshes after each turn
let userResponse = []
// game boxes listen click event
let boxes = document.querySelectorAll(".color-box")
// available choices
let choices = ["red", "green", "blue", "yellow"]

let isGameOn = false
let isGameStart = false
let isGameOver = false

// ----------------------------------------------------------- //
// GAME ON and OFF
OnOffBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("on")) {
    e.target.classList.remove("on")
    e.target.classList.add("off")
    gameOff()
  } else {
    e.target.classList.add("on")
    e.target.classList.remove("off")
    gameOn()
  }
})

function gameOff() {
  gameChoiceList = []
  userResponse = []
  isGameOn = false
  gameStop()
}

function gameOn() {
  // after the game is on it started the game
  if (!score) {
    score = 0
  }
  isGameOn = true
  showDisplay()
  startBtn.addEventListener("click", updateStart)
  startLabel.addEventListener("click", updateStart)
}
// ----------------------------------------------------------- //
// ############ //
// ----------------------------------------------------------- //
// game START and STOP

function updateStart() {
  // start button start and stop the current game
  if (startLabel.innerText == "START") {
    startBtn.style.background = "green"
    isGameStart = true
    startLabel.innerText = "STOP"
    console.log(isGameOn, isGameOver, isGameStart);
    if (!isGameOver && isGameStart) {
      playGame()
    }
  }
  else {
    startBtn.style.background = "red"
    isGameStart = false
    startLabel.innerText = "START"
  }
}

function gameStop() {
  // stop the game 
  startLabel.innerText = "START"
  startBtn.style.background = "red"
  score = null
  isGameStart = false
  startBtn.removeEventListener("click", updateStart)
  startLabel.removeEventListener("click", updateStart)
  showDisplay()
}
// ----------------------------------------------------------- //
// ############ //
// ----------------------------------------------------------- //
// display SCORE

function showDisplay() {
  // after score change update score
  displayEl.innerText = score
}
// ----------------------------------------------------------- //
// ############ //
// ----------------------------------------------------------- //
// Start the GAME

function playGame() {
  // start the game play show colors
  getRandomColor()
  console.log(gameChoiceList)
  if (!showColors(0)) {
    hearResponse()
  }
}

function getRandomColor() {
  // get random colors from the give choices
  const currentChoice = Math.floor(Math.random() * 4)
  gameChoiceList.push(choices[currentChoice])
}

function showColors(current) {
  // Brighten the current colors
  if (current === gameChoiceList.length) {
    return false
  }

  for (let box of boxes) {
    if (box.classList.contains(`${gameChoiceList[current]}-box`)) {
      box.classList.add("select")
    }
    setTimeout(() => {
      removeSelectFromBoxes()
      if (!showColors(current + 1)) {
        return false
      }
    }, initialWaitTime)
  }
}

function removeSelectFromBoxes() {
  // remove select class from earlier box
  boxes.forEach(box => {
    if (box.classList.contains("select")) {
      box.classList.remove("select")
    }
  })
}

function hearResponse() {
  // hear user response 
  boxes.forEach(box => {
    box.addEventListener("click", (e) => {
      removeSelectFromBoxes()
      userResponse.push(box.classList[1].split("-")[0])
      box.classList.add("select")
      console.log(userResponse);
      if (userResponse.length === gameChoiceList.length) {
        checkResponse()
      }
    })
  })

}

function checkResponse() {
  // check if current answer is right
  console.log(gameChoiceList, userResponse, score)
  let fail = false
  userResponse.forEach((res, ind) => {
    if (res !== gameChoiceList[ind]) {
      fail = true
    }
  })

  if (fail) {
    score = 0
    userResponse = []
    gameChoiceList = []
    showDisplay()
    updateStart()
  } else {
    score += 1
    userResponse = []
    showDisplay()
    if (!isGameOver && isGameStart) {
      playGame()
    }
  }
}
