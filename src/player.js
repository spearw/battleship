const createPlayer = (ai=false, name="player") => ({

    ai: ai,
    name: name,
    justSunk: false,
    justHit: false,
    attacks: [],
    attackBoard(x,y, board){
        console.log("attacking",x,y)
        if (x<0 || y<0){
            return false
        }
        if (x >= board.size || y >= board.size){
            //shot off the board
            return false
        }
        if (this.attacks.includes(`[${x},${y}]`)){
            //attack has already been made here
            return false
        }
        else {
            board.recieveAttack(x, y)
            this.attacks.push(`[${x},${y}]`)
            return true
        }
    },
    randomAttack(board){

        let min=0
        let max=board.size

        while(true){
            let x =Math.floor(Math.random() * (+max - +min)) + +min;
            let y =Math.floor(Math.random() * (+max - +min)) + +min;
            if (this.attackBoard(x,y,board)){
                break
            }
        }

    }

})


module.exports = createPlayer;
