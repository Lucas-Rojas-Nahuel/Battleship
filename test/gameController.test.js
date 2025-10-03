import { GameController } from "../src/gameController/gameController";

describe("GameController", () => {
  // 1. Inicialización
  test("inicia el juego con dos jugadores y tableros", () => {
    const game = new GameController();
    game.startGame();

    expect(game.player).toBeDefined();
    expect(game.computer).toBeDefined();
    expect(game.playerBoard).toBeDefined();
    expect(game.computerBoard).toBeDefined();
  });

  test("los tableros tienen barcos colocados al iniciar", () => {
    const game = new GameController();
    game.startGame();

    expect(game.playerBoard.ships.length).toBeGreaterThan(0);
    expect(game.computerBoard.ships.length).toBeGreaterThan(0);
  });

  test("el turno inicial corresponde al jugador humano", () => {
    const game = new GameController();
    game.startGame();

    expect(game.currentTurn).toBe("human");
  });

  // 2. Ataques y turnos
  test("el jugador ataca y queda registrado en el tablero enemigo", () => {
    const game = new GameController();
    game.startGame();

    const coord = [0, 0];
    game.playRound(coord);

    expect(game.computerBoard.attackedCoords.has(coord.toString())).toBe(true);
  });

  test("después del ataque del jugador, la computadora también ataca", () => {
    const game = new GameController();
    game.startGame();

    const coord = [0, 0];
    game.playRound(coord);

    expect(game.playerBoard.misses.size).toBe(1);
  });

  test("no se pueden repetir ataques en la misma celda", () => {
    const game = new GameController();
    game.startGame();

    const coord = [1, 1];
    game.playRound(coord);

    // Intento de repetir ataque
    const result = game.playRound(coord);

    expect(result).toBe("invalid");
  });

  // 3. Resultados de ataques
  test("un ataque en celda vacía se registra como miss", () => {
    const game = new GameController();
    game.startGame();

    const coord = [9, 9]; // suponemos que no hay barco en esa posición
    const result = game.playRound(coord);

    expect(result).toBe("miss");
  });

  test("un ataque en celda con barco se registra como hit", () => {
    const game = new GameController();
    game.startGame();

    // Tomamos la primera posición del primer barco
    const ship = game.computerBoard.ships[0];
    const coord = ship.positions[0];

    const result = game.playRound(coord);

    expect(result).toBe("hit");
  });

  test("cuando un barco recibe tantos hits como su longitud queda hundido", () => {
    const game = new GameController();
    game.startGame();

    const ship = game.computerBoard.ships[0];

    ship.positions.forEach((coord) => {
      game.playRound(coord);
    });

    expect(ship.ship.isSunk()).toBe(true);
  });

  // 4. Condición de victoria
  test("cuando todos los barcos del enemigo están hundidos, el jugador gana", () => {
    const game = new GameController();
    game.startGame();

    game.computerBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.ship.length; i++) {
        ship.ship.hit();
      }
    });

    expect(game.checkWinner()).toBe("player");
  });

  test("cuando todos los barcos del jugador están hundidos, la computadora gana", () => {
    const game = new GameController();
    game.startGame();

    game.playerBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.ship.length; i++) {
        ship.ship.hit();
      }
    });

    expect(game.checkWinner()).toBe("computer");
  });

  test("si ambos jugadores aún tienen barcos, no hay ganador", () => {
    const game = new GameController();
    game.startGame();

    expect(game.checkWinner()).toBe(null);
  });

  test("después de que hay un ganador, no se aceptan más ataques", () => {
    const game = new GameController();
    game.startGame();

    // hundimos a la computadora
    game.computerBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.ship.length; i++) {
        ship.ship.hit();
      }
    });

    // intento de atacar después de que terminó el juego
    const result = game.playRound([0, 0]);

    expect(result).toBe("game over");
  });
  
  // 5. Robustez
  test("no permite ataques fuera de los límites del tablero", () => {
    const game = new GameController();
    game.startGame();

    const result = game.playRound([-1, 20]);

    expect(result).toBe("invalid");
  });

  test("no permite ataques con coordenadas no válidas", () => {
    const game = new GameController();
    game.startGame();

    const result = game.playRound("not a coord");

    expect(result).toBe("invalid");
  });  
});
