import { printPlayerBoard } from "./get-board.js";
const joinBattle = document.querySelector(".join-battle");
const menu = document.querySelector(".menu");
const playersName = document.getElementById("name");
const computerBoardMenu = document.querySelector(".computer-board-menu");
const playerBoardMenu = document.querySelector(".player-board-menu");
const p1 = document.getElementById("p1");

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

getPlayerName();

export { initializeGame };
