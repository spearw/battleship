const gameBoard = require('./board')
const ship = require('./ship')
const createPlayer = require('./player')
const displayController = require('./displayController')

function newGame(customGame=false, player1ai=false, player2ai=true, player1name='player', player2name='AI', boardSize=10){
    console.log('creating players...')
    let player1 = createPlayer(player1ai, player1name)
    let player2 = createPlayer(player2ai, player2name)

    console.log('generating boards...')
    let player1board = gameBoard(boardSize)
    let player2board = gameBoard(boardSize)

    //player1 ships
    console.log('creating ships')
    let carrier1 = ship.createShip(ship.carrier)
    let battleship1 = ship.createShip(ship.battleship)
    let cruiser1 = ship.createShip(ship.cruiser)
    let destroyer1 = ship.createShip(ship.destroyer)
    let patrolBoat1 = ship.createShip(ship.patrolBoat)
    console.log('placing ships...')
    if (customGame){
        fixedPlaceShips(player1board,carrier1,battleship1,cruiser1,destroyer1,patrolBoat1)
    }
    else{
        randPlaceShips(player1board,carrier1,battleship1,cruiser1,destroyer1,patrolBoat1)
    }

    //player2 ships
    let carrier2 = ship.createShip(ship.carrier)
    let battleship2 = ship.createShip(ship.battleship)
    let cruiser2 = ship.createShip(ship.cruiser)
    let destroyer2 = ship.createShip(ship.destroyer)
    let patrolBoat2 = ship.createShip(ship.patrolBoat)
    if (customGame){
        fixedPlaceShips(player2board,carrier2,battleship2,cruiser2,destroyer2,patrolBoat2)
    }
    else{
        randPlaceShips(player2board,carrier2,battleship2,cruiser2,destroyer2,patrolBoat2)
    }
    console.log('showing boards...')

    let board1 = document.getElementById("board1")
    let board2 = document.getElementById("board2")

    displayController.updateBoard(player1board, board1, player1, player2, player2board, board2)
    displayController.updateBoard(player2board, board2, player2, player1, player1board, board1)

}

function randPlaceShips(board, carrier, battleship, cruiser, destroyer, patrolBoat){

    randPlaceShip(board, carrier)
    randPlaceShip(board, battleship)
    randPlaceShip(board, cruiser)
    randPlaceShip(board, destroyer)
    randPlaceShip(board, patrolBoat)

}

function randPlaceShip(board,ship){

    let min=0
    let max=board.size

    while(true){
        let x =Math.floor(Math.random() * (+max - +min)) + +min;
        let y =Math.floor(Math.random() * (+max - +min)) + +min;
        let random_boolean = Math.random() >= 0.5;
        if (board.placeShip(x,y,ship,random_boolean)){
            break
        }
    }
}

function fixedPlaceShips(board, carrier, battleship, cruiser, destroyer, patrolBoat){

    board.placeShip(1,1,carrier, true)
    board.placeShip(8,5,battleship,false)
    board.placeShip(2,3,cruiser, false)
    board.placeShip(5,4,destroyer, true)
    board.placeShip(2,8,patrolBoat, true)

}

document.getElementById("newgame").addEventListener('click', ()=>{newGame()})

newGame()


