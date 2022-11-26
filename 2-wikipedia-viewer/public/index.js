const search = document.getElementById("search")
const form = document.getElementById("form")
const closeBtn = document.getElementById("close-btn")

search.addEventListener("click", (e) => {
  e.target.classList.add("hide")
  form.classList.remove("hide")
})

closeBtn.addEventListener("click", (e) => {
  search.classList.remove("hide")
  form.classList.add("hide")
})