import { printPlayerBoard } from "./get-board.js";
const joinBattle = document.querySelector(".join-battle");
const menu = document.querySelector(".menu");
const playersName = document.getElementById("name");
const computerBoardMenu = document.querySelector(".computer-board-menu");
const playerBoardMenu = document.querySelector(".player-board-menu");
const p1 = document.getElementById("p1");
const icon = document.querySelectorAll(".alien-icon");

function getPlayerName() {
  joinBattle.addEventListener("click", (e) => {
    e.preventDefault();
    playerBoardMenu.style.visibility = "visible";
    menu.style.visibility = "hidden";
    p1.textContent = `Captain ${playersName.value}'s Position`;
    printPlayerBoard();
  });
}

function initializeGame() {
  computerBoardMenu.style.visibility = "visible";
  playerBoardMenu.style.position = "inherit";
}

function chooseAvatar() {
  icon.forEach((avatar) => {
    avatar.addEventListener("click", () => {
      icon.forEach((av) => av.classList.remove("alien-icon-select"));
      avatar.classList.add("alien-icon-select");
      console.log(avatar.src);
    });
  });
}

function clearName() {
  playersName.addEventListener("click", () => {
    playersName.placeholder = "";
  });

  playersName.addEventListener("blur", () => {
    if (playersName.value === "") {
      playersName.placeholder = "Almirant's Name"; 
    }
  });
}

clearName();
getPlayerName();
chooseAvatar();

export { initializeGame };
