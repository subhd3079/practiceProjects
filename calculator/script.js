let bag = "";
const noteSec = document.querySelector(".note-sec");
const ansSec = document.querySelector(".ans-sec");
let ans = 0;

document.addEventListener("click", (event) => {
  let keyVal
  if (event.target.className === 'key') keyVal = event.target.innerText;
  else keyVal = ''

  // click on clear button
  if (keyVal === "C") {
    bag = "";
    ans = 0;

  // click on equal button
  } else if (keyVal === "=") {
    if (bag === "") {
      ans = 0;
    } else {
      ans = eval(bag);
    }

  // click on other keys
  } else {
    bag += keyVal
    noteSec.innerText = bag
  }

  noteSec.innerText = bag;
  ansSec.innerText = ans;
});
