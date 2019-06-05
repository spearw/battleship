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
                    if (player.ai) {
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

                    document.getElementById("playerLocation").innerHTML = enemyPlayer.attacks[enemyPlayer.attacks.length -1]
                    console.log(playerBoard.matrix[y][x])
                    if(playerBoard.matrix[y][x] === true){
                        document.getElementById("playerOutcome").innerHTML = "Miss!"
                    }
                    else{
                        if(playerBoard.matrix[y][x].isSunk()){
                            document.getElementById("playerOutcome").innerHTML = "Sunk " + playerBoard.matrix[y][x].name + "!"
                            enemyPlayer.justHit = false
                        }
                        else{
                            document.getElementById("playerOutcome").innerHTML = "Hit!"
                            enemyPlayer.justHit = `${x}${y}`
                        }
                    }

                    updateBoard(playerBoard, htmlboard, player, enemyPlayer, enemyBoard, enemyhtmlBoard)
                    if (playerBoard.anyShipsAlive() == false){
                        alert(`${enemyPlayer.name} wins!`)
                    }



                    if(player.justHit){
                        //hit nearby
                        console.log('just hit', player.justHit)

                        if(player.attackBoard(parseInt(player.justHit[0])+1, player.justHit[1],enemyBoard)){
                        }
                        else if(player.attackBoard(parseInt(player.justHit[0])-1, player.justHit[1],enemyBoard)){
                        }
                        else if(player.attackBoard(player.justHit[0], parseInt(player.justHit[1])+1,enemyBoard)){
                        }
                        else if(player.attackBoard(player.justHit[0], parseInt(player.justHit[1])-1,enemyBoard)){
                        }
                        else{player.randomAttack(enemyBoard)}
                    }
                    else{
                        player.randomAttack(enemyBoard)
                    }

                    lastAttack = (player.attacks[player.attacks.length - 1] || "[0,0]")
                    let aix = lastAttack[1]
                    let aiy = lastAttack[3]

                    document.getElementById("aiLocation").innerHTML = player.attacks[player.attacks.length -1]

                    if(enemyBoard.matrix[aiy][aix] === true){
                        document.getElementById("aiOutcome").innerHTML = "Miss!"
                        player.justSunk = false
                    }
                    else{
                        if(enemyBoard.matrix[aiy][aix].isSunk()){
                            document.getElementById("aiOutcome").innerHTML = "Sunk " + enemyBoard.matrix[aiy][aix].name + "!"
                            player.justHit = false
                        }
                        else{
                            document.getElementById("aiOutcome").innerHTML = "Hit!"
                            player.justHit = `${aix}${aiy}`
                        }
                    }

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