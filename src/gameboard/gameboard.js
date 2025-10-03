import { initializeBoard } from "../utils/initializeBoard";

export class Gameboard {
  constructor(row, colum) {
    this.row = row ? row : 10;
    this.colum = colum ? colum : 10;
    this.board = initializeBoard(this.row, this.colum);
    this.misses = new Set();
    this.ships = [];
    this.attackedCoords = new Set();
  }

  placeShip(ship, coordinate, orientation) {
    const [x, y] = coordinate;
    const positions = [];

    if (x < 0 || x >= this.row || y < 0 || y >= this.colum)
      throw new Error("Invalid placement");

    if (orientation === "horizontal") {
      if (x + ship.length > this.row) throw new Error("Invalid placement");

      for (let i = 0; i < ship.length; i++) {
        const cellkey = `${x + i},${y}`;

        if (this.board[cellkey] !== "empty") {
          throw new Error("Overlap not allowed");
        }
        positions.push([x + i, y]);
      }
    } else if (orientation === "vertical") {
      if (y + ship.length > this.colum) throw new Error("Invalid placement");

      for (let i = 0; i < ship.length; i++) {
        const cellkey = `${x},${y + i}`;

        if (this.board[cellkey] !== "empty") {
          throw new Error("Overlap not allowed");
        }
        positions.push([x, y + i]);
      }
    }

    positions.forEach(([px, py]) => {
      this.board[`${px},${py}`] = ship;
    });

    this.ships.push({
      ship,
      positions,
    });
  }

  receiveAttack(coordinate) {
    const [x, y] = coordinate;

    //verificamos de que no se sobresalga de los limites del tablero
    if (x < 0 || x >= this.row || y < 0 || y >= this.colum) {
      throw new Error("Invalid placement");
    }

    const cellkey = `${x},${y}`;

    //verificar repetidos en misses + hits
    if (this.misses.has(cellkey) || this.attackedCoords.has(cellkey)) {
      throw new Error("Already attacked");
    }

    //si encuentra un barco actualiza su estado de golpe
    if (this.board[cellkey] !== "empty") {
      const ship = this.board[cellkey];
      ship.hit();
      this.attackedCoords.add(cellkey);
      return "hit";
    } else {
      this.misses.add(cellkey);
      return "miss";
    }
  }

  allShipsSunk() {
    //si se undieron todos los barcos devuelve true, si no devuelve false
    return this.ships.every((ship) => ship.ship.isSunk());
  }
}
