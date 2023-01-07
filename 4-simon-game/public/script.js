const OnOffBtn = document.querySelector(".on-off-btn")
let score = 0

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
  console.log("start");
}