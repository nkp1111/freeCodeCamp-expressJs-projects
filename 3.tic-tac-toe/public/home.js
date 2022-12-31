const container = document.querySelector(".container")

let choices = document.querySelectorAll(".choose")
let targetLink = document.querySelector(".target-link")

choices.forEach(choice => {
  choice.addEventListener("click", (e) => {
    choices.forEach(c => c.classList.remove("target"))
    choice.classList.add("target")
    targetLink.href = "/gameStart/" + choice.innerText
  })
})

// game start 
let player = document.querySelector(".playermark")
let colors = ["#E14D2A", "#FD841F"]
let ind = 0
let positions = ["", "", "", "", "", "", "", "", "",]
let winningCond = ["012", "345", "678", "036", "147", "258", "048", "246"]
let grids = document.querySelectorAll(".box")
player.style.color = colors[ind]
let playMode = document.querySelector(".playMode")
let player2
if (playMode.innerText.trim() === "Human") {
  player2 = "Player2"
} else {
  player2 = "Computer"
}


// check for players move 
grids.forEach(grid => {
  grid.addEventListener("click", (e) => {

    player = document.querySelector(".playermark")
    let playermark = player.innerText.trim()
    player.style.color = colors[ind]

    // find the box clicked
    let classes = e.target.parentElement.parentElement.classList
    let boxNum = classes[1].split("-")[1]
    if (positions[boxNum] === "") {
      // check if box is available 
      positions[boxNum] = playermark
      e.target.innerText = playermark
      e.target.style.color = colors[ind]

      setTimeout(function () {
        checkWinner()
        changeIdentity(playermark, player)

        if (player2 === "Computer") {
          computerTurn()
        }
      }, 500)

    }
  })
})

function computerTurn() {

  player = document.querySelector(".playermark")
  let playermark = player.innerText.trim()

  let emptyPosition = []
  positions.forEach((pos, ind) => {
    if (!pos) {
      emptyPosition.push(ind)
    }
  })
  let randint = Math.floor(Math.random() * emptyPosition.length)
  positions[emptyPosition[randint]] = playermark

  let targetGrid = document.querySelector(`.box-${emptyPosition[randint]}`).firstElementChild.firstElementChild
  targetGrid.innerText = playermark
  targetGrid.style.color = colors[ind]

  setTimeout(function () {
    checkWinner()
    changeIdentity(playermark, player)
  }, 500)
}


function checkWinner() {
  let win
  for (let con of winningCond) {
    let ind = con.split("")
    win = true
    let winner = ""
    for (let i of ind) {
      if (positions[i] && winner === "") {
        winner = positions[i]
      }
      else if (!positions[i] || positions[i] !== winner) {
        win = false
        break
      }
    }

    // winner 
    if (win && winner) {
      let currentPlayerName = document.querySelector(".player")
      document.querySelector("h2").innerHTML = ""
      container.classList.add("game-over")
      container.innerHTML = `
          <h2 class='ending'>
          <span class='playermark'
          >${currentPlayerName.innerText}
          ${winner}</span> won this round. </h2>
          <div class='btn-holder'>
          <a class='btn btn-secondary' 
            href='/startAgain'>
            Play again?</a>
          </div>`
      return
    }
  }

  // draw
  if (!win && (positions.filter(po => !po).length === 0)) {
    document.querySelector("h2").innerHTML = ""
    container.classList.add("game-over")
    container.innerHTML = `
          <h2 class='ending'>
          <span class='playermark'
          >It's a Draw</span></h2>
          <div class='btn-holder'>
          <a class='btn btn-secondary' 
            href='/startAgain'>
            Play again?</a>
          </div>`
  }
}


function changeIdentity(playermark, player) {
  // change player identity after each turn
  let currentPlayerName = document.querySelector(".player")

  // change player mark
  if (playermark === "X") {
    player.innerText = "O"
  } else {
    player.innerText = "X"
  }

  // change color
  if (ind === 0) {
    ind = 1
  } else {
    ind = 0
  }

  // change player name at heading 
  if (currentPlayerName.innerText.trim() === "Player1") {
    currentPlayerName.innerText = player2
  } else {
    currentPlayerName.innerText = "Player1"
  }
}
