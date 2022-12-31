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

grids.forEach(grid => {
  grid.addEventListener("click", (e) => {
    player = document.querySelector(".playermark")
    let playermark = player.innerText.trim()
    player.style.color = colors[ind]

    let classes = e.target.parentElement.parentElement.classList
    let boxNum = classes[1].split("-")[1]
    if (positions[boxNum] === "") {
      positions[boxNum] = playermark
      e.target.innerText = playermark
      e.target.style.color = colors[ind]

      if (playermark === "X") {
        player.innerText = "O"
      } else {
        player.innerText = "X"
      }

      if (ind === 0) {
        ind = 1
      } else {
        ind = 0
      }
    }
  })
})