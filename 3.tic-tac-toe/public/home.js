let choices = document.querySelectorAll(".choose")
let targetLink = document.querySelector(".target-link")

choices.forEach(choice => {
  choice.addEventListener("click", (e) => {
    choices.forEach(c => c.classList.remove("target"))
    choice.classList.add("target")
    targetLink.href = "/gameStart/" + choice.innerText
  })
})