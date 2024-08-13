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
      square.textContent = content[j][i];
      row.append(square);
    }
    board.append(row);
  }
}

function attack() {
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const input = coordinatesInput.value.trim().split(",");

    if (input.length === 2) {
      console.log(input);
      const x = parseInt(input[0].trim());
      const y = parseInt(input[1].trim());

      if (!isNaN(x) && !isNaN(y)) {
        player.computer.receiveAttack(x, y);
        player.player.computerAttack();
        printSquares(playerBoard, player.printPlayerBoard());
        printSquares(computerBoard, player.printComputerBoard());
      } else {
        console.error("Invalid coordinates");
      }
    }

    coordinatesInput.value = "";
  });
}

printSquares(playerBoard, playerBoardContent);
printSquares(computerBoard, computerBoardContent);
attack();
