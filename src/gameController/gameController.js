import { Gameboard } from "../gameboard/gameboard";
import { Player } from "../players/player";
import { Ship } from "../ships/ship";

export class GameController {
  constructor() {
    this.player = null;
    this.computer = null;
    this.playerBoard = null;
    this.computerBoard = null;
    this.resultGame = null;
    this.currentTurn = "human";
  }

  startGame() {
    const player = new Player("human");
    const playerBoard = new Gameboard();
    const playerShip = new Ship(2);
    playerBoard.placeShip(playerShip, [0, 0], "horizontal");
    this.player = player;
    this.playerBoard = playerBoard;

    const computer = new Player("computer");
    const computerBoard = new Gameboard();
    const computerShip = new Ship(2);
    computerBoard.placeShip(computerShip, [0, 0], "vertical");
    this.computer = computer;
    this.computerBoard = computerBoard;
  }

  playRound(coord) {
    if (this.checkWinner() != null) {
      return "game over";
    } else {
      if (this.currentTurn === "human") {
        try {
          let shot = this.player.attack(this.computerBoard, coord);
          this.currentTurn = "computer";
          this.playRound();
          return shot;
        } catch (error) {
          return "invalid";
        }
      } else if (this.currentTurn === "computer") {
        let shot = this.computer.randomAttack(this.playerBoard);

        this.currentTurn = "human";
        return shot.shot;
      }
    }
  }

  checkWinner() {
    if (this.computerBoard.allShipsSunk()) {
      this.resultGame = true;
      return "player";
    } else if (this.playerBoard.allShipsSunk()) {
      this.resultGame = true;
      return "computer";
    }
    return null;
  }

  placeShips(coord, length){

  }
}
