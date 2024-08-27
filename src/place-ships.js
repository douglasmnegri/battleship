import { printShipInsideBoard } from "./get-board.js";
// import { initializeGame } from "./game-menu.js";


const playerBoard = document.getElementById("player-board");

function getShipsCoordinates() {
  let axisDirection = "v";
  let shipLength = 5;

  function setupAxisToggle() {
    const axisButton = document.getElementById("axis");
    axisButton.addEventListener("click", () => {
      if (axisDirection === "v") {
        axisDirection = "h";
        axisButton.textContent = "Axis: Y";
      } else {
        axisDirection = "v";
        axisButton.textContent = "Axis: X";
      }
    });
  }

  function placeShips() {
    function getBoardCoordinates(e) {
      if (e.target.classList.contains("coordinate-content")) {
        const x = parseInt(e.target.dataset.row);
        const y = parseInt(e.target.dataset.col);

        printShipInsideBoard(x, y, axisDirection);
        shipLength--;
        // if(shipLength == 0) {
        //   initializeGame();
        // }
      }
    }
    playerBoard.addEventListener("click", getBoardCoordinates);
  }

  function addHoverColor(e) {
    if (e.target.classList.contains("coordinate-content")) {
      const x = parseInt(e.target.dataset.row);
      const y = parseInt(e.target.dataset.col);
      for (let i = 0; i < shipLength; i++) {
        let targetCell;
        if (axisDirection === "v") {
          targetCell = document.querySelector(
            `[data-row="${x + i}"][data-col="${y}"]`
          );
        } else {
          targetCell = document.querySelector(
            `[data-row="${x}"][data-col="${y + i}"]`
          );
        }
        if (targetCell) {
          targetCell.classList.add("color");
        }
      }
    }
  }

  function removeHoverColor(e) {
    if (e.target.classList.contains("coordinate-content")) {
      const x = parseInt(e.target.dataset.row);
      const y = parseInt(e.target.dataset.col);

      for (let i = 0; i < shipLength; i++) {
        let targetCell;
        if (axisDirection === "v") {
          targetCell = document.querySelector(
            `[data-row="${x + i}"][data-col="${y}"]`
          );
        } else {
          targetCell = document.querySelector(
            `[data-row="${x}"][data-col="${y + i}"]`
          );
        }
        if (targetCell) {
          targetCell.classList.remove("color");
        }
      }
    }
  }

  playerBoard.addEventListener("mouseover", addHoverColor);
  playerBoard.addEventListener("mouseout", removeHoverColor);

  setupAxisToggle();
  placeShips();
}

getShipsCoordinates();


