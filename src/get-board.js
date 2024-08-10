import { gameBoard, player } from "./battleship-logic.js";

const playerBoardContent = player.printPlayerBoard();
const computerBoardContent = player.printComputerBoard();

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");

function printSquares(board, content) {
  for (let i = 0; i < playerBoardContent.length; i++) {
    let row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      let square = document.createElement("div");
      square.classList.add("coordinate-content");
      square.textContent = content[i][j]
      row.append(square);
    }
    board.append(row);
  }
}

printSquares(playerBoard, playerBoardContent);
printSquares(computerBoard, computerBoardContent);
