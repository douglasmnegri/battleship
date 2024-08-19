class Ship {
  constructor(length, numOfHit = 0, sunk = false, coordinates = []) {
    this.length = length;
    this.numOfHit = numOfHit;
    this.sunk = sunk;
    this.coordinates = coordinates;
    this.name = this.shipName(length);
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

  shipName(length) {
    switch (length) {
      case 1:
        return "Patrol Boat";
      case 2:
        return "Destroyer";
      case 3:
        return "Submarine";
      case 4:
        return "Battleship";
      case 5:
        return "Carrier";
      default:
        return "Unknown Ship";
    }
  }
}

class Gameboard {
  constructor() {
    this.board = this.printBoard();
    this.ships = [];
  }

  resetBoard() {
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

  addShip(coordinateX, coordinateY, direction) {
    const shipCoordinates = [];
    const length = 5 - this.ships.length;

    if (
      (direction.toUpperCase() === "H" &&
        (coordinateY < 0 || coordinateY + length > 10)) ||
      (direction.toUpperCase() === "V" &&
        (coordinateX < 0 || coordinateX + length > 10))
    ) {
      console.log("Coordinates are out of bounds or ship does not fit");
      return;
    }

    const newShip = new Ship(length);

    for (let i = 0; i < length; i++) {
      if (
        (direction.toUpperCase() === "H" &&
          this.board[coordinateX][coordinateY + i] !== "*") ||
        (direction.toUpperCase() === "V" &&
          this.board[coordinateX + i][coordinateY] !== "*")
      ) {
        console.log("Those coordinates are unavailable");
        return;
      }
    }

    for (let i = 0; i < length; i++) {
      if (direction.toUpperCase() === "H") {
        shipCoordinates.push([coordinateX, coordinateY + i]);
        this.board[coordinateX][coordinateY + i] = "S";
      } else if (direction.toUpperCase() === "V") {
        shipCoordinates.push([coordinateX + i, coordinateY]);
        this.board[coordinateX + i][coordinateY] = "S";
      }
    }

    newShip.coordinates = shipCoordinates;
    this.ships.push(newShip);
    return this.board;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] == "H" || this.board[x][y] == "M") {
      console.log("This coordinate has been targeted already");
      return false;
    }
    if (this.board[x][y] === "S") {
      this.board[x][y] = "H";

      let sunkMessage = null;
      this.ships.forEach((ship) => {
        if (
          ship.coordinates.some((coord) => coord[0] === x && coord[1] === y)
        ) {
          ship.hit();
          console.log(ship);
          if (ship.isSunk() && !ship.sunkReported) {
            sunkMessage = `Enemy ${ship.name} is sunk`;
            ship.sunkReported = true;
            console.log(sunkMessage);
          }
        }
      });

      if (sunkMessage) {
        return sunkMessage;
      }
    } else {
      this.board[x][y] = "M";
    }

    return this.board;
  }

  computerAttack() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.board[x][y] === "H" || this.board[x][y] === "M");

    const result = this.receiveAttack(x, y);
    console.log(`Computer attacked at coordinates: ${x}, ${y}`);
  }
}

class Player {
  constructor() {
    this.player = new Gameboard();
    this.computer = new Gameboard();
  }

  printPlayerBoard(x, y, playerBoard = this.player) {
    if (x !== undefined && y !== undefined) {
      return playerBoard.addShip(x, y, "V");
    } else {
      return playerBoard.printBoard();
    }
  }

  printComputerBoard(computerBoard = this.computer) {
    while (computerBoard.ships.length < 5) {
      try {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction = Math.random() > 0.5 ? "H" : "V";
        computerBoard.addShip(x, y, direction);
      } catch (error) {
        // Ignoring error and trying again
      }
    }
    return computerBoard.board;
  }

  gameOver() {
    if (this.player.ships.every((ship) => ship.sunk)) {
      alert("Player lost! Game over.");
      return true;
    } else if (this.computer.ships.every((ship) => ship.sunk)) {
      alert("Computer lost! Game over.");
      return true;
    }
    return false;
  }

  resetGame() {
    this.player.resetBoard();
    this.printPlayerBoard();
    this.computer.resetBoard();
    this.printComputerBoard();
  }
}

const gameBoard = new Gameboard();
const player = new Player();

export { gameBoard, player };
