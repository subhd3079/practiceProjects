///////// validation ///////////////
function validation(pass) {
  let sign = false;
  let alph = false;
  let len = false;

  for (let i = 0; i < pass.length; i++) {
    if (
      pass[i] === "!" ||
      pass[i] === "@" ||
      pass[i] === "#" ||
      pass[i] === "$" ||
      pass[i] === "%" ||
      pass[i] === "^" ||
      pass[i] === "&" ||
      pass[i] === "*"
    ) {
      sign = true;
      break;
    }
  }

  for (let i = 0; i < pass.length; i++) {
    if (pass[i].toLowerCase() !== pass[i].toUpperCase()) {
      alph = true;
      break;
    }
  }

  if (pass.length >= 5) len = true;

  if (sign === false || alph === false || len === false) return false;
  else return true;
}

//////////////// show and hide password ////////////////
document.querySelector(".imageOne").addEventListener("click", function () {
  document.querySelector(".passwordPara").innerText = "Hide password";
  document.querySelector(".imageOne").classList.toggle("hiding");
  document.querySelector(".imageTwo").classList.toggle("hiding");
  document.querySelector("#password").type = "text";
});

document.querySelector(".imageTwo").addEventListener("click", function () {
  document.querySelector(".passwordPara").innerText = "Show password";
  document.querySelector(".imageTwo").classList.toggle("hiding");
  document.querySelector(".imageOne").classList.toggle("hiding");
  document.querySelector("#password").type = "password";
});

function dataConst(name, email, password, balance, time) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.balance = balance;
  this.time = time;
}

let data = JSON.parse(localStorage.getItem("data")) || [];

document
  .querySelector(".signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    createAccount();
  });

function createAccount() {
  let form = document.querySelector(".signupForm");

  let name = form.name.value;
  let email = form.email.value;
  let password = form.password.value;
  let confirm = form.confirm.value;
  let balance = [];
  let time = [];

  let check = false;

  for (let i = 0; i < data.length; i++) {
    if (email === data[i].email) {
      check = true;
      currentEmail = data[i].email;
      break;
    }
  }

  if (check === false) {
    if (password === confirm) {
      let item = new dataConst(name, email, password, balance, time);
      data.push(item);
      localStorage.setItem("data", JSON.stringify(data));

      document.querySelector(".passwordEror").style.visibility = "hidden";

      window.location.href = "index.html";
      alert("Account created successfully");
    } else {
      document.querySelector(".passwordEror").innerText =
        "Password is not matching";
      document.querySelector(".passwordEror").style.visibility = "visible";
    }
  } else {
    document.querySelector(".passwordEror").style.visibility = "visible";
    document.querySelector(".passwordEror").innerText = "Account already exist";
  }
}
