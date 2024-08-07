class Ship {
  constructor(length, numOfHit = 0, sunk = false) {
    this.length = length;
    this.numOfHit = numOfHit;
    this.sunk = sunk;
  }

  hit() {
    this.numOfHit++;
    this.isSunk();
    return this.numOfHit;
  }

  isSunk() {
    this.sunk = this.numOfHit >= this.length;
    return this.sunk;
  }
}

class Gameboard {
  constructor() {
    this.board = this.printBoard();
    this.ships = [];
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

  addShip(length, coordinateX, coordinateY, direction) {
    if (
      (direction.toUpperCase() === "H" &&
        (coordinateY < 0 || coordinateY + length > 10)) ||
      (direction.toUpperCase() === "V" &&
        (coordinateX < 0 || coordinateX + length > 10))
    ) {
      throw new Error("Coordinates are out of bounds or ship does not fit");
    }

    const newShip = new Ship(length);

    for (let i = 0; i < length; i++) {
      if (
        (direction.toUpperCase() === "H" &&
          this.board[coordinateX][coordinateY + i] !== "*") ||
        (direction.toUpperCase() === "V" &&
          this.board[coordinateX + i][coordinateY] !== "*")
      ) {
        throw new Error("Those coordinates are unavailable");
      }
    }

    for (let i = 0; i < length; i++) {
      if (direction.toUpperCase() === "H") {
        this.board[coordinateX][coordinateY + i] = "S";
      } else if (direction.toUpperCase() === "V") {
        this.board[coordinateX + i][coordinateY] = "S";
      }
    }

    this.ships.push(newShip);
    return this.board;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === "S") {
      this.board[x][y] = "H";

      for (const ship of this.ships) {
        if (ship.hit()) {
          if (ship.isSunk()) {
            console.log("Enemy ship is sunk");
          }
          break;
        }
      }
    } else {
      this.board[x][y] = "M";
    }
  }

  displayBoard() {
    this.board.forEach((row) => {
      console.log(row.join(" "));
    });
  }
}

const printGameBoard = new Gameboard();
printGameBoard.addShip(4, 0, 0, "V");

printGameBoard.addShip(5, 4, 3, "H");
printGameBoard.addShip(3, 0, 9, "V");
printGameBoard.addShip(2, 9, 0, "H");
printGameBoard.addShip(1, 7, 5, "H");

printGameBoard.receiveAttack(0, 0);
printGameBoard.receiveAttack(1, 0);
printGameBoard.receiveAttack(2, 0);
printGameBoard.receiveAttack(3, 0);
