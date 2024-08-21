import { printShipInsideBoard } from "./get-board.js";

const playerBoard = document.getElementById("player-board");

function getShipsCoordinates() {
  let axisDirection = "v";
  const shipLength = 5;

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

// Add a function that receives a string that determines the axis of the battleship (check)
// Substitute the "v" on printShipInsideBoard(x, y, "v") to the variable retrieved from the last function (check)
// Create a function that will hover over the squares that the ship will be placed
// By hovering over the board, we can then implement drag and drop
