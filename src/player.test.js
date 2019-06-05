const gameBoard = require('./board');
const createPlayer = require('./player')

beforeEach(() => {

   board2 = gameBoard(2)
   board3 = gameBoard(3)
   player = createPlayer()

})

it('should be able to attack a gameboard', function () {
   player.attackBoard(0,0,board3)
   player.attackBoard(1,1,board3)
   expect(board3.matrix).toStrictEqual([
      [true, null, null],
      [null, true, null],
      [null, null, null]
   ])
});

it('should return true when trying to attack a new spot', function () {
   player.attackBoard(0,0,board3)
   expect(player.attackBoard(0,1,board3)).toBe(true)

});

it('should return false when trying to attack a previously attacked spot', function () {
   player.attackBoard(0,0,board3)
   expect(player.attackBoard(0,0,board3)).toBe(false)

});

it('should return false when trying to attack a spot not on the board', function () {
  expect(player.attackBoard(3,3, board3)).toBe(false)
});

it('should only call attack board once when random attack is used', function () {
   player.randomAttack(board3)
   expect(board3.matrix).not.toStrictEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
   ])
});

