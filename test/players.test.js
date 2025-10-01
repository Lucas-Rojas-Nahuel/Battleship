import { Ship } from "../src/ships/ship";
import { Gameboard } from "../src/gameboard/gameboard";
import { Player } from "../src/players/player";

describe("Player", () => {
  test("el jugador humano puede atacar al jugador enemigo", () => {
    const player = new Player("human");
    const enemyBoard = new Gameboard();
    const ship = new Ship(1);
    enemyBoard.placeShip(ship, [0, 0], "horizontal");

    player.attack(enemyBoard, [0, 0]);
    expect(ship.damageReceived).toBe(1);
  });

  test("la computadora hace un ataque válido dentro del tablero", () => {
    const computer = new Player("computer");
    const enemyBoard = new Gameboard();

    const coord = computer.randomAttack(enemyBoard);
    expect(coord[0]).toBeGreaterThanOrEqual(0);
    expect(coord[0]).toBeLessThan(10);
    expect(coord[1]).toBeGreaterThanOrEqual(0);
    expect(coord[1]).toBeLessThan(10);
  });

  test("la computadora no repite ataques", () => {
    const computer = new Player("computer");
    const enemyBoard = new Gameboard();

    const first = computer.randomAttack(enemyBoard);
    const secund = computer.randomAttack(enemyBoard);

    expect(first).not.toEqual(secund);
  });
});
