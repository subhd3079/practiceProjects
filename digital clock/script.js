setInterval(() => {
  let hour = new Date().getHours()
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()

  document.querySelector('.hour').innerText = hour
  document.querySelector('.minute').innerText = minute
  document.querySelector('.second').innerText = second
}, 1000);