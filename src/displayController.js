const updateBoard = (playerBoard, htmlboard, player, enemyPlayer, enemyBoard, enemyhtmlBoard) => {

    let board = htmlboard
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    for (i=0;i<playerBoard.size;i++){

        let newRow = document.createElement('tr')

        for (j=0;j<playerBoard.size;j++){

            let newSquare = document.createElement('td')
            newSquare.className = "square"
            if (player.ai){
                newSquare.id = `C${j}${i}`
            }
            else{
                newSquare.id = `P${j}${i}`
            }

            if (playerBoard.matrix[i][j] === true){
                newSquare.innerHTML = "_"
            }
            else if (playerBoard.matrix[i][j] === null){
                newSquare.innerHTML = "&nbsp"
            }
            else if (playerBoard.matrix[i][j].isSunk() || false){
                newSquare.innerHTML = "X"
                newSquare.classList.add("destroyed")
            }
            else{
                //ship was shot
                if (enemyPlayer.attacks.includes(`[${j},${i}]`)){
                    newSquare.innerHTML = "x"
                }
                else {
                    //check if ai's board
                    if (player.ai == 'potato') {
                        //hide the ships
                        newSquare.innerHTML = "&nbsp"
                    }
                    else {
                        if (playerBoard.matrix[i][j].horizontal) {
                            newSquare.innerHTML = "&#8594"
                        } else {
                            newSquare.innerHTML = "&#8593"
                        }
                    }
                }
            }

            if (player.ai) {
                newSquare.addEventListener('click', () => {
                    let x = newSquare.id[1]
                    let y = newSquare.id[2]
                    enemyPlayer.attackBoard(x, y, playerBoard)
                    updateBoard(playerBoard, htmlboard, player, enemyPlayer, enemyBoard, enemyhtmlBoard)
                    if (playerBoard.anyShipsAlive() == false){
                        alert(`${enemyPlayer.name} wins!`)
                    }


                    player.randomAttack(enemyBoard)
                    updateBoard(enemyBoard, enemyhtmlBoard, enemyPlayer, player, playerBoard, htmlboard)
                    if (enemyBoard.anyShipsAlive() == false){
                        alert(`${player.name} wins!`)
                    }
                })
            }
            newRow.appendChild(newSquare)

        }

        board.appendChild(newRow)
    }

}




module.exports.updateBoard = updateBoard;