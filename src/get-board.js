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
  function bindAttackEvents() {
    const rows = document.querySelectorAll("#computer-board > .board-row");

    rows.forEach((row, rowIndex) => {
      const squaresInRow = row.querySelectorAll(".coordinate-content");
      squaresInRow.forEach((square, colIndex) => {
        square.addEventListener("click", (event) => {
          event.preventDefault();

          const x = parseInt(colIndex);
          const y = parseInt(rowIndex);

          player.computer.receiveAttack(x, y);
          updateBoards();
          

          player.player.computerAttack();
          updateBoards();
          if (player.gameOver()) return; 
          if (player.gameOver()) return; 
        });
      });
    });
  }

  function updateBoards() {
    printSquares(playerBoard, player.printPlayerBoard());
    printSquares(computerBoard, player.printComputerBoard());
    if (player.gameOver()) {
      player.resetGame(); 
    } else {
      bindAttackEvents(); 
    }
  }

  updateBoards();
}

printSquares(playerBoard, playerBoardContent);
printSquares(computerBoard, computerBoardContent);
attack();
