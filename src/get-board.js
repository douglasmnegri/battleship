const playerBoard = document.getElementById("player-board");

function printSquares() {
  for (let i = 0; i < 10; i++) {
    let row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      let square = document.createElement("div");
      square.classList.add("coordinate-content");
      square.textContent = "*";
      row.append(square);
    }
    playerBoard.append(row);
  }
}

printSquares();
