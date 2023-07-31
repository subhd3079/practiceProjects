const title = document.querySelector(".title");
const ans = document.querySelector(".ans");
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const score = document.querySelector(".score");
const highscore = document.querySelector(".highscore");
const currect = document.querySelector(".currect");

let random = Math.floor(Math.random() * 20) + 1;
let sc = 20;
let hi = 0;

// click on submit button
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const inputVal = Number(input.value);

  sc--;
  score.innerText = "Score: " + sc;

  if (sc <= 0) {
    ans.innerText = "Better Luck Next Time!";
    ans.style.color = "red";
    title.innerText = "Game Over!";

    input.style.visibility = "hidden";
    submit.style.visibility = "hidden";
  } else if (sc > 0) {
    if (inputVal < random) {
      ans.innerText = "It is too Low!";
      ans.style.color = "yellow";
    } else if (inputVal > random) {
      ans.innerText = "It is too High!";
      ans.style.color = "orange";
    } else if (inputVal === random) {
      ans.innerText = "Currect Ans!";
      ans.style.color = "green";
      title.innerText = "You are the Best!";

      input.style.visibility = "hidden";
      submit.style.visibility = "hidden";
      currect.style.visibility = "visible";
      currect.innerText = "Ans: " + random;

      if (sc > hi) {
        hi = sc
        highscore.innerText = 'Highscore: ' + hi
      }
    }
  }

  input.value = "";
});

// click on new game button
document.querySelector('.new-game').addEventListener('click', function() {
  title.innerText = 'Guess The Number!'
  ans.innerText = 'Start Guessing...'
  ans.style.color = 'white'
  input.style.visibility = 'visible'
  submit.style.visibility = 'visible'
  sc = 20
  score.innerText = 'Score: ' + sc
  highscore.innerText = 'Highscore: ' + hi
  currect.style.visibility = "hidden";
  random = Math.floor(Math.random() * 20) + 1;
})