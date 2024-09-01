import { player } from "./battleship-logic.js";

const computerBoardContent = player.printComputerBoard();
const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const hudMessage = document.getElementById("hud-interface");
const submitBtn = document.getElementById("submit-btn");
const shipCoordinates = document.getElementById("ship-coordinates");
const shipDirection = document.getElementById("ship-direction");

// Refactor the the printSquares() function so it's less verbose

function printPlayerBoard() {
  const initialBoard = player.player.board;
  return printSquares(playerBoard, initialBoard, "player");
}

function printShipInsideBoard(coordinateX, coordinateY, shipDirection) {
  const playerBoardContent = player.printPlayerBoard(
    coordinateX,
    coordinateY,
    shipDirection
  );
  if (playerBoardContent == undefined) {
    alert("Those coordinates are unavailable");
    return false;
  } else {
    printSquares(playerBoard, playerBoardContent, "player");
  }

  if (!printSquares(computerBoard, computerBoardContent)) {
    printSquares(computerBoard, computerBoardContent, "computer");
  }
}

function printSquares(board, content, player) {
  board.innerHTML = "";
  for (let i = 0; i < content.length; i++) {
    let row = document.createElement("div");
    row.classList.add("board-row");
    for (let j = 0; j < content[i].length; j++) {
      let square = document.createElement("div");
      square.classList.add("coordinate-content");
      if (player == "computer") {
        if (content[i][j] == "H" || content[i][j] == "M") {
          square.textContent = content[i][j];
        } else {
          square.textContent = "*";
        }
      }

      if (player == "player") {
        square.textContent = content[i][j];
      }
      square.dataset.row = i;
      square.dataset.col = j;
      row.append(square);
    }
    board.append(row);
  }
}

function attack() {
  function handleAttack(event) {
    if (event.target.classList.contains("coordinate-content")) {
      const x = parseInt(event.target.dataset.row);
      const y = parseInt(event.target.dataset.col);

      if (!player.computer.receiveAttack(x, y)) {
        hudMessage.textContent =
          "You've targeted this coordinate before. Try again!";
        return;
      }

      computerBoard.classList.add("disable-pointer-events");

      if (player.gameOver()) {
        player.resetGame();
        printSquares(playerBoard, player.printPlayerBoard(), "player");
        printSquares(computerBoard, player.printComputerBoard(), "computer");
        return;
      }

      player.player.computerAttack();

      hudMessage.textContent =
        "Opponent's turn. He's shooting into your position!";

      setTimeout(() => {
        printSquares(playerBoard, player.printPlayerBoard(), "player");
        hudMessage.textContent = "It's your turn. Shoot the enemy waters!";

        computerBoard.classList.remove("disable-pointer-events");
      }, 2);

      printSquares(computerBoard, player.printComputerBoard(), "computer");
    }
  }

  computerBoard.addEventListener("click", handleAttack);
}

printPlayerBoard();
attack();

export { printPlayerBoard, printShipInsideBoard };
