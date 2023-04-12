const container = document.querySelector(".container");
const imgList = document.querySelectorAll(".imgs-list");
const imgOpp = document.querySelector(".tick");
const imgName = document.querySelectorAll(".img-name");
const score = document.querySelectorAll(".score");
// const replayButton = document.querySelector(".replay");

function reRender() {
  imgList[0].innerHTML = `
  <li><img class="img-detail rock" src="images/img0.png" alt="Rock image"/></li>
  <li><img class="img-detail paper" src="images/img1.png" alt="Paper image" /></li>
  <li><img class="img-detail scissors" src="images/img2.png" alt="Scissors image" /></li>`;

  imgList[1].innerHTML = `
  <li><img class="img-detail tick" src="images/img3.png" alt="Tick image placeholder"  /></li>`;

  imgName[0].textContent = "";
  imgName[1].textContent = "";
}
function addButton() {
  container.insertAdjacentHTML(
    "beforebegin",
    `<button class="replay">Replay</button>`
  );
}

let playerScore = 0;
let opponentScore = 0;

container.addEventListener("click", function (e) {
  const parentField = imgName[0].closest(".field--1");

  let opponentPick = "";
  let playerPick = "";
  if (!e.target.classList.contains("img-detail")) return;
  const clicked = e.target;

  if (clicked.closest(".field--2")) return;

  if (clicked.classList.contains("rock")) {
    imgList[0].innerHTML = `<li> <img class="img-detail rock" src="images/img0.png" alt="Rock image" /> </li>`;
    imgName[0].textContent = "ROCK";
    playerPick = "rock";
  } else if (clicked.classList.contains("paper")) {
    imgList[0].innerHTML = `<li><img class="img-detail paper" src="images/img1.png" alt="Paper image" /></li>`;
    imgName[0].textContent = "PAPER";
    playerPick = "paper";
  } else if (clicked.classList.contains("scissors")) {
    imgList[0].innerHTML = `<li> <img class="img-detail scissors" src="images/img2.png" alt="Scissors image" /> </li>`;
    imgName[0].textContent = "SCISSORS";
    playerPick = "scissors";
  }

  const random = Math.floor(Math.random() * 3);
  imgOpp.src = `images/img${random}.png`;
  if (random === 0) {
    imgName[1].textContent = "ROCK";
    opponentPick = "rock";
  } else if (random === 1) {
    imgName[1].textContent = "PAPER";
    opponentPick = "paper";
  } else if (random === 2) {
    imgName[1].textContent = "SCISSORS";
    opponentPick = "scissors";
  }

  if (playerPick === opponentPick) {
    addButton();
  } else if (playerPick === "rock" && opponentPick === "paper") {
    opponentScore += 1;
    score[1].textContent = opponentScore;
    addButton();
  } else if (playerPick === "rock" && opponentPick === "scissors") {
    playerScore += 1;
    score[0].textContent = playerScore;
    addButton();
  } else if (playerPick === "paper" && opponentPick === "rock") {
    playerScore += 1;
    score[0].textContent = playerScore;
    addButton();
  } else if (playerPick === "paper" && opponentPick === "scissors") {
    opponentScore += 1;
    score[1].textContent = opponentScore;
    addButton();
  } else if (playerPick === "scissors" && opponentPick === "rock") {
    opponentScore += 1;
    score[1].textContent = opponentScore;
    addButton();
  } else if (playerPick === "scissors" && opponentPick === "paper") {
    playerScore += 1;
    score[0].textContent = playerScore;
    addButton();
  }

  replayButton.addEventListener("click", function (e) {
    console.log(123456);
    reRender();
    replayButton.remove();
  });

  // Re-render the whole thing

  // IF EITHER OF SCORE CONFIRM THE WINNER
  if (opponentScore === 3) {
    parentField.insertAdjacentHTML(
      "beforeend",
      `<span class="winner_announcement">LOST</span>`
    );
  } else if (playerScore === 3) {
    parentField.insertAdjacentHTML(
      "beforeend",
      `<span class="winner_announcement">WON</span>`
    );
  }
});
