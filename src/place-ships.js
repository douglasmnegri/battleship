import { printShipInsideBoard } from "./get-board.js";
// Add a function that receives a string that determines the axis of the battleship (check)
// Substitute the "v" on printShipInsideBoard(x, y, "v") to the variable retrieved from the last function (check)
// Create a function that will hover over the squares that the ship will be placed
// By hovering over the board, we can then implement drag and drop

const playerBoard = document.getElementById("player-board");

function getShipsCoordinates() {
  let axisDirection = "v";

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

  function hoverOverBoard() {
    
  }
  setupAxisToggle();
  placeShips();
}

getShipsCoordinates();
