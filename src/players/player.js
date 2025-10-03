import { getRandomCoordinate } from "../utils/getRandomCoordinate";

export class Player {
  constructor(player) {
    this.player = player;
    this.attackedCoords = new Set();
  }

  attack(enemyBoard, coord) {
    const shop = enemyBoard.receiveAttack(coord);
    return shop;
  }

  randomAttack(enemyBoard) {
    let coord;
    let coordKey;

    do {
      coord = getRandomCoordinate();
      coordKey = coord.toString();
    } while (this.attackedCoords.has(coordKey));

    this.attackedCoords.add(coordKey);

    let shot = enemyBoard.receiveAttack(coord);

    return {coord, shot};
  }
}
