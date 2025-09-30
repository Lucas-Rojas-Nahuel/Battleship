import { Ship } from "../src/ships/ship.js";

describe("ship class", () => {
  test("Un barco se crea con la longitud correcta y sin golpes", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.damageReceived).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  test("hit() incrementa el número de golpes", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.damageReceived).toBe(1);
  });

  test("hit() puede llamarse varias veces y acumular golpes", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.damageReceived).toBe(2);
  });

  test("isSuck() devuelve false si aun no se alcanzó la longitud", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.StateOfSinking).toBe(false);
  });

  test("isSuck() devuelve true si los golpes igualan la longitud", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("los golpes no deben superar la longitud del barco", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.damageReceived).toBe(2);
  });
});
