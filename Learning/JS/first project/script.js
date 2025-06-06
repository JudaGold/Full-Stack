"use strict";

// console.log(document.querySelector(".j-top-score").textContent)
// console.log(document.getElementById("score").textContent);
// document.getElementById("score").textContent = 25
// console.log(document.getElementById("score").textContent);

// console.log(document.getElementById("noBox").value);
// document.getElementById("noBox").value = 15;
// console.log(document.getElementById("noBox").value);

let correctNumber = Math.trunc(Math.random() * 50 + 1);
const helpText = document.getElementById("helpText");
let score = document.getElementById("score");
let highScore = document.getElementById("highScore");
let numbers = new Array();

// document.getElementById("hiddenNumber").textContent = correctNumber
const tempNo = document.getElementById("noBox")
document.getElementById("guessBtn").addEventListener("click", function () {
  const inputValue = Number(tempNo.value);
  helpText.classList.remove("error");
  if(inputValue || inputValue === 0){
    if(inputValue > 50 || inputValue < 1){
      helpText.textContent = "Your guess must be between 1 and 50!";
    }
    else if (inputValue === correctNumber) {
      helpText.textContent = "CORRECT!"
      highScore.textContent = Number(score.textContent) > Number(highScore.textContent) ? score.textContent : highScore.textContent
      document.getElementById("hiddenNumber").textContent = correctNumber
      document.getElementById("hiddenNumber").style.backgroundColor = '#00ff00'
    }
    else {
      helpText.textContent = "Try again!"
      if(numbers.includes(inputValue)){
        helpText.textContent = `
        You have already guessed this number!
        Try Another
        `;
      }
      else{
        numbers.push(inputValue);
        score.textContent = Number(score.textContent) - 1;
        if(Number(score.textContent) === 0){
          helpText.textContent = "You Lose!";
          document.getElementById("guessBtn").disabled = true;
        }
      }
    }
  }
  else {
    helpText.textContent = "A number must be entered";
    helpText.classList.add("error");
  }
});

document.getElementById("resetBtn").addEventListener("click", function () {
console.log("test");
  correctNumber = Math.trunc(Math.random() * 50 + 1);
  document.getElementById("hiddenNumber").textContent = '?';
  numbers = [];
  tempNo.value = '';
  score.textContent = '49';
  helpText.textContent = "Guess a number...";
  document.getElementById("hiddenNumber").style.backgroundColor = 'white'
});

