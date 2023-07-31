let data = JSON.parse(localStorage.getItem("data")) || [];
let currentName = localStorage.getItem("currentName");
let currentEmail = localStorage.getItem("currentEmail");

currentName = currentName.split("");
currentName[0] = currentName[0].toUpperCase();
currentName = currentName.join("");

document.querySelector(".welcome").innerText = "Welcome " + currentName;

// click transfer
document
  .querySelector(".transferForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    transferMoney();
    updateBalance();
  });

// click loan
document
  .querySelector(".loanForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    getLoan();
    updateBalance();
  });

// click close button
document
  .querySelector(".closeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    closeAccount();
  });

let minute = new Date().getMinutes();
let hour = new Date().getHours();
let date = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();
let today = `${date}/${month + 1}/${year}`;

let monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

document.querySelector(".currentTime").innerText = `${hour}:${minute}, ${date} ${monthArr[month]} ${year}`;

///////////// transfer money ///////////////
function transferMoney() {
  let form = document.querySelector(".transferForm");

  let person = form.transferTo.value;
  let amount = form.transferAmount.value;
  let check = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].email === person && person !== currentEmail) {
      check = true;
      break;
    }
  }

  if (check) {
    data.forEach((element) => {
      if (person === element.email && amount > 0) {
        element.balance.push(+amount);
        element.time.push(today);
      }

      if (currentEmail === element.email && amount > 0) {
        element.balance.push(-amount);
        element.time.push(today);
      }
    });

    localStorage.setItem("data", JSON.stringify(data));

    form.transferTo.value = "";
    form.transferAmount.value = "";
  } else {
    document.querySelector(".transferEror").style.visibility = "visible";
  }
}

///////////// get loan ///////////////
function getLoan() {
  let form = document.querySelector(".loanForm");

  let amount = form.loanAmount.value;

  data.forEach((element) => {
    if (currentEmail === element.email && amount > 0) {
      element.balance.push(+amount);
      element.time.push(today);
    }
  });

  localStorage.setItem("data", JSON.stringify(data));

  form.loanAmount.value = "";
}

///////////// close account ///////////////
function closeAccount() {
  let form = document.querySelector(".closeForm");

  let person = form.closeId.value;
  let password = form.closePassword.value;

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].email === person &&
      person === currentEmail &&
      password === data[i].password
    ) {
      window.location.href = "index.html";

      form.closeId.value = "";
      form.closePassword.value = "";
    } else {
      document.querySelector(".closeEror").style.visibility = "visible";
    }
  }
}

///////////// update balance //////////
function updateBalance() {
  let inBalance = 0;
  let outBalance = 0;

  document.querySelector(".balanceChart").innerHTML = "";
  data.forEach((element) => {
    if (element.email === currentEmail) {
      for (let i = 0; i < element.balance.length; i++) {
        let ind = document.createElement("p");
        let type = document.createElement("p");
        let date = document.createElement("p");
        let bal = document.createElement("h3");
        let div = document.createElement("div");

        ind.innerText = i + 1;
        if (element.balance[i] < 0) {
          type.innerText = "WITHDRAW";
          type.setAttribute("class", "withdraw");
          outBalance += Math.abs(element.balance[i]);
        } else if (element.balance[i] > 0) {
          type.innerText = "DEPOSITE";
          type.setAttribute("class", "deposit");
          inBalance += element.balance[i];
        }
        date.innerText = element.time[i];
        bal.innerText = element.balance[i];

        div.append(ind, type, date, bal);
        document
          .querySelector(".balanceChart")
          .insertAdjacentElement("afterbegin", div);
      }
    }
  });

  let currentBalance = inBalance - outBalance;
  let interest = Math.floor((12 * currentBalance) / 100);

  document.querySelector(".mainBalance").innerText = currentBalance + " /-";
  document.querySelector(".in").innerText = "In: " + inBalance;
  document.querySelector(".out").innerText = "Out: " + outBalance;
  document.querySelector(".interest").innerText = "Interest: " + interest;
}
updateBalance();


let closeMin = 9
let closeSec = 60

setInterval(() => {
  closeSec--

  document.querySelector('.closingTime').innerText = closeMin + ':' + closeSec

  if (closeSec === 0) {
    closeSec = 60
    closeMin--
  }

  if (closeMin === 0) {
    window.location.href = 'index.html'
  }
}, 500);

