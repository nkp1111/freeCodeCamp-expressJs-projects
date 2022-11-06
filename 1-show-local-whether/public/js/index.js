const temp = document.getElementById('temp')
let unit = 'c'

temp.addEventListener('click', (e) => {

  let currentTemp = +e.target.innerText.split(' ')[0]
  if (unit === 'c') {
    unit = 'f'
    currentTemp = (currentTemp * 9 / 5) + 32
    e.target.innerHTML = `${currentTemp.toFixed(2)} <span class="text-primary">&#8457;</span>`
  } else if (unit === 'f') {
    unit = 'c'
    currentTemp = (currentTemp - 32) * 5 / 9
    e.target.innerHTML = `${currentTemp.toFixed(2)} <span class="text-primary">&#8451;</span>`
  }
})
