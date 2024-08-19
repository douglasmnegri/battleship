import { player } from "./battleship-logic.js";

// const playerBoardContent = player.printPlayerBoard();
const computerBoardContent = player.printComputerBoard();

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const hudMessage = document.getElementById("hud-interface");
const submitBtn = document.getElementById("submit-btn");
const attackCoordinates = document.getElementById("attack-coordinates");
// print both boards with *;
// invoke addShip() func 5 times to place all ships;
// after that we should call printSquares with the computer's board;

function getCoordinates() {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const clearInput = attackCoordinates.value.split(",");
    const x = Number(clearInput[0]);
    const y = Number(clearInput[1]);
    const playerBoardContent = player.printPlayerBoard(x, y);
    if (playerBoardContent == undefined) {
      return alert("Those coordinates are unavailable");
    } else {
      printSquares(playerBoard, playerBoardContent);
    }
  });
}
function printSquares(board, content) {
  board.innerHTML = "";
  for (let i = 0; i < content.length; i++) {
    let row = document.createElement("div");
    row.classList.add("board-row");
    for (let j = 0; j < content[i].length; j++) {
      let square = document.createElement("div");
      square.classList.add("coordinate-content");
      square.textContent = content[i][j]; // Ensure this is getting the correct value
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
        printSquares(playerBoard, player.printPlayerBoard());
        printSquares(computerBoard, player.printComputerBoard());
        return;
      }

      player.player.computerAttack();

      hudMessage.textContent =
        "Opponent's turn. He's shooting into your position!";

      setTimeout(() => {
        printSquares(playerBoard, player.printPlayerBoard());
        hudMessage.textContent = "It's your turn. Shoot the enemy waters!";

        computerBoard.classList.remove("disable-pointer-events");
      }, 2000);

      printSquares(computerBoard, player.printComputerBoard());
    }
  }

  computerBoard.addEventListener("click", handleAttack);
}

// printSquares(playerBoard, playerBoardContent);
getCoordinates();
attack();
// printSquares(computerBoard, computerBoardContent);
