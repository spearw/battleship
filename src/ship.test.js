const ship = require('./ship.js');


it('should have a length', function () {
  expect(ship.createShip({length: 4}).length).toBe(4)
});

it('should take a ship object', function () {
  expect(ship.createShip(ship.battleship).length).toBe(4)
});

it('should take different ships', function () {
  expect(ship.createShip(ship.cruiser).length).toBe(3)
});

it('should know its own name', function () {
  expect(ship.createShip(ship.cruiser).name).toBe("Cruiser")
});

it('should initialize with full health', function () {
  expect(ship.createShip(ship.battleship).hits).toStrictEqual([0,0,0,0])
});

it('should not start sunk', function () {
  expect(ship.createShip(ship.battleship).isSunk()).toBe(false);
});

it('should register hits', function () {
 expect(ship.createShip(ship.battleship).hit().hits).toStrictEqual([1,0,0,0])
});

it('should sink when all parts are hit', function () {
  expect(ship.createShip(ship.battleship).hit().hit().hit().hit().isSunk()).toBe(true);
});