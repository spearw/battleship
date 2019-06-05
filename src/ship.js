const createShip = ({name, length, horizontal }) => ({
    name,
    length,
    horizontal,
    hits: Array(length).fill(0),
    hit(){
        foundIndex = this.hits.findIndex(x => x == 0)
        this.hits[foundIndex] = 1;
        return this
    },
    isSunk(){
        return this.hits.every((x)=> x == 1);
    }
});

carrier = {
    name: "Carrier",
    length: 5,
}

battleship = {
    name: "Battleship",
    length: 4,
};

cruiser = {
    name: "Cruiser",
    length: 3,
}

destroyer = {
    name: "Destroyer",
    length: 3,
}

patrolBoat = {
    name: "Patrol Boat",
    length: 2,
}

submarine = {
    name: "Submarine",
    length: 1,
}

module.exports.createShip = createShip;
module.exports.carrier = carrier;
module.exports.battleship = battleship;
module.exports.cruiser = cruiser;
module.exports.destroyer = destroyer;
module.exports.patrolBoat = patrolBoat;
module.exports.submarine = submarine;
