class Ship {
  constructor(length, numOfHit = 0, sunk = false) {
    this.length = length;
    this.numOfHit = numOfHit;
    this.sunk = sunk;
  }

  hit() {
    return ++this.numOfHit;
  }

  isSunk(length = this.length, numOfHit = this.numOfHit, sunk = this.sunk) {
    return numOfHit == length ? (sunk = true) : (sunk = false);
  }
}

class Gameboard {
  constructor() {
    this.board = this.printBoard();
  }

  printBoard() {
    let gameBoard = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push("*");
      }
      gameBoard.push(row);
    }
    return gameBoard;
  }

  addShip(length, coordinateX, coordinateY, direction, board = this.board) {
    const newShip = new Ship(length);

    if (
      coordinateX > 10 ||
      coordinateX < 0 ||
      coordinateY > 10 ||
      coordinateY < 0
    ) {
      throw new Error("Those coordinates are unavailable");
    }

    for (let i = 0; i < length; i++) {
      if (direction.toUpperCase() == "H") {
        board[coordinateX][coordinateY + i] = "S";
      } else if (direction.toUpperCase() == "V") {
        board[coordinateX + i][coordinateY] = "S";
      }
    }
    return board;
  }

  displayBoard() {
    this.board.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

const printGameBoard = new Gameboard();
printGameBoard.addShip(2, 11, 3, "v");
printGameBoard.displayBoard();
