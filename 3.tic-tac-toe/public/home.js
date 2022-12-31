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


// check for players move 
grids.forEach(grid => {
  grid.addEventListener("click", (e) => {
    let currentPlayerName = document.querySelector(".player")
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
        currentPlayerName.innerText = "Player2"
      } else {
        currentPlayerName.innerText = "Player1"
      }

      checkWinner()

    }
  })
})


function checkWinner() {
  for (let con of winningCond) {
    let ind = con.split("")
    let win = true
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
    if (win && winner) {
      let currentPlayerName = document.querySelector(".player")
      document.querySelector("h2").innerHTML = ""
      container.classList.add("game-over")
      container.innerHTML = `
          <h2 class='ending'>
          ${currentPlayerName.innerText}
          <span class='playermark'>${winner}</span> won this round. </h2>
          <div class='btn-holder'>
          <a class='btn btn-secondary' 
            href='/startAgain'>
            Play again?</a>
          </div>
`

    }
  }

}