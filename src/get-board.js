import { player } from "./battleship-logic.js";

const playerBoardContent = player.printPlayerBoard();
const computerBoardContent = player.printComputerBoard();

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const submitBtn = document.getElementById("submit-btn");
const coordinatesInput = document.getElementById("attack-coordinates");

function printSquares(board, content) {
  board.innerHTML = "";
  for (let i = 0; i < content.length; i++) {
    let row = document.createElement("div");
    row.classList.add("board-row");
    for (let j = 0; j < content[i].length; j++) {
      let square = document.createElement("div");
      square.classList.add("coordinate-content");
      square.textContent = content[i][j];
      row.append(square);
    }
    board.append(row);
  }
}

function getValue() {
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const input = coordinatesInput.value.trim().split(",");

    if (input.length === 2) {
      const x = parseInt(input[0].trim());
      const y = parseInt(input[1].trim());

      if (!isNaN(x) && !isNaN(y)) {
        const result = player.computer.receiveAttack(x, y);
        console.log(`Attacking computer at coordinates: ${x}, ${y}`);
        console.log(result ? "Hit!" : "Miss!");

        printSquares(playerBoard, player.printPlayerBoard());
        printSquares(computerBoard, player.printComputerBoard());
      } else {
        console.error("Invalid coordinates");
      }
    } else {
      console.error("Please enter coordinates in the format: x,y");
    }

    coordinatesInput.value = ""; // Reset the input field
  });
}

printSquares(playerBoard, playerBoardContent);
printSquares(computerBoard, computerBoardContent);
getValue();
