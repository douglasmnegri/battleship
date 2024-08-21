import { printShipInsideBoard } from "./get-board.js";

const playerBoard = document.getElementById("player-board");

function placeShips() {
  function getBoardCoordinates(e) {
    if (e.target.classList.contains("coordinate-content")) {
      const x = parseInt(e.target.dataset.row);
      const y = parseInt(e.target.dataset.col);
      printShipInsideBoard(x, y, "v");
    }
  }
  playerBoard.addEventListener("click", getBoardCoordinates);
}

placeShips();
