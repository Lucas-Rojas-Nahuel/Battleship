import { Ship } from "../src/ships/ship";
import { Gameboard } from "../src/gameboard/gameboard";

describe("Gameboard", () => {
  test("coloca un barco horizontal en el tablero", () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    board.placeShip(ship, [0, 0], "horizontal");

    // debería ocupar (0,0), (1,0), (2,0)
    expect(board.board["0,0"]).toBe(ship);
    expect(board.board["1,0"]).toBe(ship);
    expect(board.board["2,0"]).toBe(ship);
  });

  test("coloca un barco verticalmente en el tablero", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [3, 3], "vertical");

    expect(board.board["3,3"]).toBe(ship);
    expect(board.board["3,4"]).toBe(ship);
  });

  test("no permite colocar un barco fuera del tablero", () => {
    const board = new Gameboard();
    const ship = new Ship(4);
    expect(() => {
      board.placeShip(ship, [8, 0], "horizontal");
    }).toThrow("Invalid placement");
  });

  test("no permite superponer barcos", () => {
    const board = new Gameboard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(2);
    board.placeShip(ship1, [0, 0], "horizontal");
    expect(() => {
      board.placeShip(ship2, [1, 0], "vertical");
    }).toThrow("Overlap not allowed");
  });

  test("recibir un ataque que golpea un barco llama a hit()", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0], "horizontal");
    board.receiveAttack([0, 0]);
    expect(ship.damageReceived).toBe(1);
  });

  test("recibir un ataque vacío se registra como miss", () => {
    const board = new Gameboard();
    board.receiveAttack([5, 5]);
    expect(board.misses).toContainEqual([5, 5]);
  });

  test("no permite atacar la misma celda dos veces", () => {
    const board = new Gameboard();
    board.receiveAttack([2, 2]);
    expect(() => {
      board.receiveAttack([2, 2]);
    }).toThrow("Already attacked");
  });

  test("allShipsSunk() devuelve true si todos los barcos están hundidos", () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, [0, 0], "horizontal");
    board.receiveAttack([0, 0]);
    expect(board.allShipsSunk()).toBe(true);
  });

  test("allShipsSunk() devuelve false si aún queda barcos vivos", () => {
    const board = new Gameboard();
    const ship = new Ship(2);
    board.placeShip(ship, [0, 0], "horizontal");
    board.receiveAttack([0, 0]);
    expect(board.allShipsSunk()).toBe(false);
  });
});
