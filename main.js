const inputsArea = document.querySelector(".inputs");
const hintsButton = document.querySelector(".hint");
const checkButton = document.querySelector(".check");
const wordsArray = [
  "create",
  "update",
  "delete",
  "master",
  "branch",
  "mainly",
  "diyar",
  "school",
];
let randomWords = wordsArray[Math.floor(Math.random() * wordsArray.length)];

let hints = 2;
let trys = 5;
let currentry = 1;
function builtGame() {
  for (let i = 1; i <= trys; i++) {
    inputsArea.innerHTML += `<div class="try${i}">try ${i}</div>`;
  }
  const trysDiv = document.querySelectorAll(".inputs >div");
  trysDiv.forEach((div, index) => {
    if (index != 0) div.classList.add("disabled");
    for (let i = 0; i < randomWords.length; i++) {
      div.innerHTML += `<input type="text" maxlength="1" data-index=${i}>`;
    }
  });
  trysDiv[0].children[0].focus();
}

window.onload = builtGame();

focusInput();

function focusInput() {
  const inputsNotDisabled = document.querySelectorAll(
    `.inputs > div:not(.disabled) input`
  );
  inputsNotDisabled[0].focus();
  inputsNotDisabled.forEach((inp, index) => {
    inp.addEventListener("input", () => {
      if (inputsNotDisabled[index + 1]) inputsNotDisabled[index + 1].focus();
    });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (inputsNotDisabled[index + 1]) inputsNotDisabled[index + 1].focus();
      } else if (e.key === "ArrowLeft") {
        if (inputsNotDisabled[index - 1]) inputsNotDisabled[index - 1].focus();
      }
    });
  });
  const inputsDisabled = document.querySelectorAll(
    `.inputs > div.disabled input`
  );
  inputsDisabled.forEach((input) => (input.disabled = true));
}

checkButton.onclick = () => {
  let success = true;
  let currenInputs = document.querySelectorAll(`.try${currentry} input`);
  let currentDiv = document.querySelector(`.try${currentry}`);
  for (let i = 0; i < randomWords.length; i++) {
    let letter = currenInputs[i].value;
    let wordsLetter = randomWords[i];
    if (letter == wordsLetter) {
      currenInputs[i].classList.add("in-place");
    } else if (randomWords.includes(letter) && currenInputs[i].value != "") {
      currenInputs[i].classList.add("not-in-place");
      success = false;
    } else {
      success = false;
      currenInputs[i].classList.add("wrong");
    }
  }

  if (success) {
    console.log("you wine");
    checkButton.classList.add("disabled");
    hintsButton.classList.add("disabled");
    successFun("good game you wine", "gren");
  } else {
    if (currentry < trys) {
      currentDiv.classList.add("disabled");
      currentry++;
      document.querySelector(`.try${currentry}`).classList.remove("disabled");
      document
        .querySelectorAll(`.try${currentry} input`)
        .forEach((inp) => (inp.disabled = false));
      focusInput();
    }
  }
  let lastInputindex = document.querySelectorAll(".inputs > div").length;
  let lastInput = document.querySelector(`.try${lastInputindex}`);
  if (lastInput == currentDiv) {
    checkButton.classList.add("disabled");
    hintsButton.classList.add("disabled");
    successFun(`game over the word is ${randomWords}`, "red");
  }
};

let hint = 0;

hintsButton.innerHTML = hints;
hintsButton.onclick = () => {
  if (hints != 0) {
    hints--;
    hintsButton.innerHTML = hints;
    let currenInputs = Array.from(
      document.querySelectorAll(`.try${currentry} input`)
    );

    let letter = randomWords[hint];
    currenInputs[hint].value = letter;
    currenInputs[hint++].classList.add("in-place");
  }
};

document.onkeyup = (e) => {
  if (e.key == "Backspace") {
    const inputs = document.querySelectorAll(`.try${currentry} input`);
    let chosenIndex = e.target.dataset.index;
    inputs[chosenIndex].value = "";

    if (chosenIndex > 0) {
      inputs[chosenIndex - 1].value = "";
      inputs[chosenIndex - 1].focus();
    }
  }
  if (e.key == "Enter") {
    checkButton.click();
  }
  if (e.key == "Tab") {
    e.preventDefault();
  }
};

function successFun(h1Text, buttonClass) {
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let h1 = document.createElement("h1");
  h1.innerHTML = h1Text;
  let button = document.createElement("button");
  button.innerHTML = "Play Again";
  button.className = buttonClass;
  button.addEventListener("click", () => {
    window.location.reload();
  });
  overlay.appendChild(h1);
  overlay.appendChild(button);
  document.body.appendChild(overlay);
}
