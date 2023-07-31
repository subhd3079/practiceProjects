/*
get and store the data
show the data
delete items
*/

const selectTyepe = document.querySelector(".type");
const inputDesc = document.querySelector(".desc");
const inputAmount = document.querySelector(".amount");
const incAppendSection = document.querySelector(".inc-item-section");
const expAppendSection = document.querySelector(".exp-item-section");
const totalIncSection = document.querySelector(".inc-amount");
const totalExpSection = document.querySelector(".exp-amount");
const percentageSection = document.querySelector(".exp-percentage");
const budgetSection = document.querySelector(".budget");

class dataConst {
  constructor(type, desc, amount) {
    this.type = type;
    this.desc = desc;
    this.amount = amount;
  }
}

let data = JSON.parse(localStorage.getItem("budgetItems")) || [];

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  getItem();
  showData();
  calculateBudget();
});

// get and store the items data
function getItem() {
  let t = selectTyepe.value;
  let d = inputDesc.value;
  let a = Number(inputAmount.value);

  if (d !== "" && a !== "" && a > 0) {
    let newData = new dataConst(t, d, a);
    data.push(newData);
    localStorage.setItem("budgetItems", JSON.stringify(data));
  }

  inputDesc.value = "";
  inputAmount.value = "";
  inputDesc.focus();
}

// show the data to UI
function showData() {
  incAppendSection.innerHTML = "";
  expAppendSection.innerHTML = "";

  data.forEach((element, index) => {
    let bigDiv = document.createElement("div");
    let smallDiv = document.createElement("div");
    let headingTitle = document.createElement("h4");
    let paraAmount = document.createElement("p");
    let buttonCut = document.createElement("button");

    headingTitle.innerText = element.desc;
    paraAmount.innerText = element.amount;
    buttonCut.innerText = "x";

    smallDiv.append(headingTitle, paraAmount);
    bigDiv.append(smallDiv, buttonCut);

    if (element.type === "inc") {
      bigDiv.setAttribute("class", "inc-item");
      incAppendSection.append(bigDiv);
    } else if (element.type === "exp") {
      bigDiv.setAttribute("class", "exp-item");
      expAppendSection.append(bigDiv);
    }

    buttonCut.addEventListener("click", function () {
      deleteItem(index);
      showData();
      calculateBudget();
    });
  });
}
showData();

// delete items
function deleteItem(ind) {
  data.splice(ind, 1);
  localStorage.setItem("budgetItems", JSON.stringify(data));
}

// calculate budget
function calculateBudget() {
  let totalInc = 0;
  let totalExp = 0;
  let budget, percentage;

  data.forEach((element) => {
    if (element.type === "inc") totalInc += element.amount;
    else if (element.type === "exp") totalExp += element.amount;
  });

  if (totalInc > totalExp) {
    budget = totalInc - totalExp;
    percentage = Math.round((totalExp / totalInc) * 100);
  }
  if (totalInc <= totalExp) {
    budget = 0;
    percentage = 0;
  }

  totalIncSection.innerText = "+ " + totalInc;
  totalExpSection.innerText = "- " + totalExp;
  percentageSection.innerText = percentage + "%";
  budgetSection.innerText = budget;
}
calculateBudget();

// showing the current month
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

let monthNum = new Date().getMonth();
let year = new Date().getFullYear();
let month = monthArr[monthNum];

document.querySelector('.budget-title').innerText = `Budget of ${month} ${year}`;