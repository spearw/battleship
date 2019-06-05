const createBoard = (size) => ({

    size: size,
    matrix: initializeBoard(size),
    placeShip(x, y, ship, horizontal=true){


        //check for errors
         if(horizontal){
             ship.horizontal = true
            for (i=0;i<ship.length;i++){

                //overlap
                if (this.matrix[y][x+i] != null) {
                  return false
                }
                //off the board
                else if(y >= matrix.length || x+i >= matrix[y].length ){
                    return false
                }

            }
        }
        else{
             ship.horizontal = false

            for (i=0;i<ship.length;i++){

                if(y+i >= matrix.length || x >= matrix[y].length ){
                    return false
                }
                //overlap
                else if (this.matrix[y+i][x] != null){
                  return false
                }

            }
        }

        if(horizontal){
            for (i=0;i<ship.length;i++){

                this.matrix[y][x+i] = ship

            }
        }
        else{

            for (i=0;i<ship.length;i++){

                this.matrix[y+i][x] = ship

            }
        }
        return this
    },
    recieveAttack(x, y){

        if(this.matrix[y][x]!=null){

            this.matrix[y][x].hit(0)
            this.matrix[y][x] = this.matrix[y][x]
            return true
        }
        else{
            this.matrix[y][x] = true
            return false
        }

    },
    anyShipsAlive(){
        for (let i=0;i<this.matrix.length;i++){
            for (let j=0;j<this.matrix[i].length;j++){

                if (this.matrix[i][j]== null || this.matrix[i][j]== true){
                    continue
                }
                else if (this.matrix[i][j].isSunk() == false){
                    return true
                }

            }
        }
        return false
    }


});


const initializeBoard = (size) => {
    matrix = []
    for(var i=0; i<size; i++) {
        matrix[i] = new Array(size)
        matrix[i].fill(null)
    }
    return matrix
}



module.exports = createBoard;