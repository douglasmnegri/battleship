import { printPlayerBoard } from "./get-board.js";
const joinBattle = document.querySelector(".join-battle");
const menu = document.querySelector(".menu");
const playersName = document.getElementById("name");
const computerBoardMenu = document.querySelector(".computer-board-menu");
const playerBoardMenu = document.querySelector(".player-board-menu");
const icon = document.querySelectorAll(".alien-icon");
const charTxt = document.querySelector(".char-text");
const charImg = document.querySelector(".char-text img");
let playerAvatar = "";

function getPlayerName() {
  joinBattle.addEventListener("click", (e) => {
    if (playersName.value && playerAvatar) {
      e.preventDefault();
      playerBoardMenu.style.visibility = "visible";
      menu.style.visibility = "hidden";
      charImg.src = `./images/${playerAvatar}.png`;

      printPlayerBoard();
    } else {
      e.preventDefault();
      alert("Please enter your name and select an avatar!");
    }
  });
}

getPlayerName();

function initializeGame() {
  computerBoardMenu.style.visibility = "visible";
  playerBoardMenu.style.position = "inherit";
  charTxt.style.visibility = "visible";
  console.log(playerAvatar);
}

function chooseAvatar() {
  icon.forEach((avatar) => {
    avatar.addEventListener("click", () => {
      icon.forEach((av) => av.classList.remove("alien-icon-select"));
      avatar.classList.add("alien-icon-select");
      playerAvatar = avatar.id;

      console.log(playerAvatar);
    });
  });
}

function clearName() {
  playersName.addEventListener("click", () => {
    playersName.placeholder = "";
  });

  playersName.addEventListener("blur", () => {
    if (playersName.value === "") {
      playersName.placeholder = "Admiral's Name";
    }
  });
}

clearName();
getPlayerName();
chooseAvatar();

export { initializeGame };
