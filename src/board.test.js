const gameBoard = require('./board');
const ship = require('./ship.js');


beforeEach(() => {

    board2 = gameBoard(2)
    board3 = gameBoard(3)
    patrolBoatTest = ship.createShip(ship.patrolBoat)
    submarineTest = ship.createShip(ship.submarine)

})

it('should take a size x argument and give an empty board with sides x', function () {
    expect(gameBoard(2).matrix).toStrictEqual([[null,null],[null, null]])
});

it('should take a size x argument and give an empty board with sides x', function () {
   expect(board3.matrix).toStrictEqual([
         [null, null, null],
         [null, null, null],
         [null, null, null]
       ])
});

it('should be able to place ships at specific coordinates by calling the ship factory function', function () {
   expect(board3.placeShip(0,0, submarineTest).matrix).toStrictEqual([
         [submarineTest, null, null],
         [null, null, null],
         [null, null, null]
       ])
});

it('should be able to place multi-square ships at specific coordinates by calling the ship factory function', function () {
    expect(board3.placeShip(0,0, patrolBoatTest).matrix).toStrictEqual([
        [patrolBoatTest, patrolBoatTest, null],
        [null, null, null],
        [null, null, null]
    ])
});


it('should be able to place multi-square ships vertically', function () {
    expect(board3.placeShip(0,0, patrolBoatTest, false).matrix).toStrictEqual([
        [patrolBoatTest, null, null],
        [patrolBoatTest, null, null],
        [null, null, null]
    ])
});

it('should return error if placeship is used overlapping another ship', function () {
    expect(() => {board3.placeShip(0,0, patrolBoatTest, false)
        .placeShip(0,0,patrolBoatTest)}).toThrow()
});

it('should return error if placeship would place a ship off the board ', function () {
    expect(() => {board3.placeShip(2,0, patrolBoatTest)}).toThrow()
});

describe('hit detection', () =>{

    beforeEach(()=>{

        board3.placeShip(1,1, patrolBoatTest)

    })

    it('should detect a hit ship', function () {
        board3.recieveAttack(1,1)
        expect(patrolBoatTest.hits).toStrictEqual([1,0])
    });

    it('should detect multiple hits', function () {
        board3.recieveAttack(1,1)
        board3.recieveAttack(2,1)
        expect(patrolBoatTest.hits).toStrictEqual([1,1])
    });

    it('should store misses', function () {
       board3.recieveAttack(0,0)
        expect(board3.matrix).toStrictEqual([
            [true, null, null],
            [null, patrolBoatTest, patrolBoatTest],
            [null, null, null]
        ])
    });

    it('should know when its ships are not sunk', function () {
        board3.recieveAttack(1,1)
        expect(board3.anyShipsAlive()).toBe(true)
    });


    it('should know when all its ships are not sunk', function () {
        board3.recieveAttack(1,1)
        board3.recieveAttack(2,1)
        board3.placeShip(0,0, submarineTest)
        expect(board3.anyShipsAlive()).toBe(true)
    });

    it('should know when all its ships are sunk', function () {
        board3.recieveAttack(1,1)
        board3.recieveAttack(2,1)
        expect(board3.anyShipsAlive()).toBe(false)
    });

    it('should know when all its ships are sunk', function () {
        board3.placeShip(0,0, submarineTest)
        board3.recieveAttack(0,0)
        board3.recieveAttack(1,1)
        board3.recieveAttack(2,1)
        expect(board3.anyShipsAlive()).toBe(false)
    });

})

