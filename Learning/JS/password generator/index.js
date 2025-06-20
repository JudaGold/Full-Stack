const p1 = document.querySelector("#firstPassowrd");
const p2 = document.querySelector("#secondPassowrd");
const pl = document.querySelector("#passwordLength");
const error = document.querySelector("#error");

const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

function randomletterSelector() {
  return characters[Math.trunc(Math.random() * characters.length)];
}

function generatePasswords() {
  let temp1 = "";
  let temp2 = "";
  let err = "";

  if (pl.value < 0 || pl.value > 15) err = "Please enter a value from 1 to 15";
  else {
    for (let i = 0; i < pl.value; ++i) {
      temp2 += randomletterSelector();
      temp1 += randomletterSelector();
    }
  }

  err !== ""
    ? (error.style.display = "inline-block")
    : (error.style.display = "none");
  error.textContent = err;
  p1.textContent = temp1;
  p2.textContent = temp2;
}

function copyText(id) {
  if (id === "firstPassowrd") {
    navigator.clipboard.writeText(p1.textContent);
  } else {
    navigator.clipboard.writeText(p2.textContent);
  }
}
