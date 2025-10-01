import { initializeBoard } from "../utils/initializeBoard";

export class Gameboard {
  constructor(row, colum) {
    this.row = row ? row : 10;
    this.colum = colum ? colum : 10;
    this.board = initializeBoard(this.row, this.colum);
    this.misses = [];
  }

  placeShip(ship, coordinate, orientation) {
    const [x, y] = coordinate;

    if (x < 0 || x >= this.row || y < 0 || y >= this.colum) {
      throw new Error("Invalid placement");
    }

    if (orientation === "horizontal") {
      if (x + ship.length > this.row) {
        throw new Error("Invalid placement");
      }

      for (let i = 0; i < ship.length; i++) {
        const cellkey = `${x + i},${y}`;

        if (this.board[cellkey] !== "empty") {
          throw new Error("Overlap not allowed");
        }
      }

      for (let i = 0; i < ship.length; i++) {
        const cellkey = `${x + i},${y}`;
        this.board[cellkey] = ship;
      }
    } else if (orientation === "vertical") {
      if (y + ship.length > this.colum) {
        throw new Error("Invalid placement");
      }

      for (let i = 0; i < ship.length; i++) {
        const cellkey = `${x},${y + i}`;

        if (this.board[cellkey] !== "empty") {
          throw new Error("Overlap not allowed");
        }
      }

      for (let i = 0; i < ship.length; i++) {
        const cellkey = `${x},${y + i}`;
        this.board[cellkey] = ship;
      }
    }
  }

  receiveAttack(coordinate) {
    const [x, y] = coordinate;

    //verificamos de que no se sobresalga de los limites del tablero
    if (x < 0 || x >= this.row || y < 0 || y >= this.colum) {
      throw new Error("Invalid placement");
    }

    //verificamos de que no repita la coordenada
    const isRepeated = this.misses.some(
      (arr) =>
        arr.length === coordinate.length &&
        arr.every((element, index) => element === coordinate[index])
    );

    if (isRepeated) {
      throw new Error("Already attacked");
    }

    const cellkey = `${x},${y}`;

    //si encuentra un barco actualiza su estado de golpe
    if (this.board[cellkey] !== "empty") {
      this.board[cellkey].hit();
    }

    //guardamos las cordenadas para no repetir los ataques
    this.misses.push(coordinate);
  }

  allShipsSunk() {
    //guardamos el estado de todos los barcos que se encuentra
    const ships = [];
    for (let x = 0; x < this.row; x++) {
      for (let y = 0; y < this.colum; y++) {
        let cellkey = `${x},${y}`;
        if (this.board[cellkey] !== "empty") {
          ships.push(this.board[cellkey].isSunk());
        }
      }
    }

    //si se undieron todos los barcos devuelve true, si no devuelve false
    if (ships.length === 1) {
      return ships[0];
    } else {
      let isTrue = false;
      for (let i = 0; i < ships.length; i++) {
        if (ships[i] === true) {
          isTrue = true;
        } else {
          return false;
        }
      }
      return isTrue;
    }
  }
}
