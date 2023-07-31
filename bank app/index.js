let data = JSON.parse(localStorage.getItem("data")) || []
let currentName = ''
let currentEmail = ''

document
  .querySelector(".loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()
    login()
  });

function login() {
  let form = document.querySelector(".loginForm")

  let loginId = form.loginId.value
  let password = form.password.value

  let check = false;

  for (let i = 0; i < data.length; i++) {
    if (loginId === data[i].email && password === data[i].password) {
      check = true;
      currentName = data[i].name
      currentEmail = data[i].email
      break
    }
  }

  if (check) {
    window.location.href = "account.html"
    localStorage.setItem("currentName", currentName)
    localStorage.setItem("currentEmail", currentEmail)
  } else document.querySelector(".loginEror").style.visibility = "visible"
}