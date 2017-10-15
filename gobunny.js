'use strict';

/**************************************
 *  Easter Bunny HQ App
 *
 *  Assumptions/Decisions
 *  - Grid is comprised of squares, every block is equidistant
 *  - Dr. Bunny is 'theoretically' moving about the grid in order to compute the location of Easter
 *    Bunny HQ and comments below refer to her in this sense
 *
 **************************************/


/**
 * Track the direction in which Dr. Bunny is facing as she 'theoretically' moves about the grid
 * Initial direction is facing north
 * Coordinates in x,y vector form:  North [0, 1], South [0, -1], East [1,0], West [-1,0]
 * @constructor
 */

function Direction() {
    this.vector = {
        x: 0,
        y: 1
    };
}

/**
 * Compute the new direction vector that results from a R or L turn instruction
 * @param {string} turnDirection
 */
Direction.prototype.turn = function (turnDirection) {
    console.log('  BEFORE current DirectionVector', this.vector.x, this.vector.y);
    if (this.vector.x === 0) {
        // If current direction is North/South a right turn will persist the sign of new direction vector in the x,y grid
        turnDirection === 'R' ? this.swap(1) : this.swap(-1);
    } else {
        // If current direction is East/West a right turn will negate the sign of new direction vector
        turnDirection === 'R' ? this.swap(-1) : this.swap(1);
    }
    console.log('  AFTER current DirectionVector', this.vector.x, this.vector.y);
};

/**
 * Swap the x, y values in the direction vector
 * @param sign
 */
Direction.prototype.swap = function (sign) {
    var temp = this.vector.x;
    this.vector.x = this.vector.y * sign;
    this.vector.y = temp * sign;
};

/**
 * Track the position of Dr. Bunny in the city grid in terms of a Cartesian grid
 * @constructor
 */
function Position() {
    this.x = 0;
    this.y = 0;
}

/**
 * Update Dr. Bunny's position by computing the distance moved in the specified direction
 * @param distance
 * @param directionVector
 */
Position.prototype.updatePosition = function (distance, directionVector) {
    if (!distance || !directionVector) {
        console.error('Cannot move Dr. Bunny without distance and direction vector');
        return;
    }
    console.log('  Update position by ',  distance, 'units in ', directionVector, 'direction');
    console.log('  BEFORE moving ',  'x:', this.x, ' y:', this.y);
    if (directionVector.x === 0) {
        this.y += distance * directionVector.y;
    } else {
        this.x += distance * directionVector.x;
    }
    console.log('  AFTER moving ',  ' x:', this.x, ' y:', this.y);
};

/**
 * Find the location of the Easter Bunny HQ from a given sequence of movements in a city grid
 * @param {Array} sequence
 * @constructor
 */
function FindEasterBunnyHQ(sequence) {
    if (!sequence) {
        console.error('FindEasterBunnyHQ requires a sequence of movements');
        return;
    }
    this.direction = new Direction();
    this.position = new Position();
    this.minimumBlocksAway = null;
    this.parsedSequence = this.parseSequence(sequence);
    console.log('FindEasterBunnyHQ', this);
    this.hopAlongTheBlocks();
}

/**
 * Break the sequence strings into turn direction and travel distance
 * @param {Array} sequence
 * @returns {Array}
 */
FindEasterBunnyHQ.prototype.parseSequence = function (sequence) {
    return sequence.map(function (instruction) {
        return {
            turn: instruction.slice(0, 1),
            distance: instruction.slice(1)
        };
    });
};

/**
 * Move Dr. Bunny through the grid by computing the new direction and distance traveled for each sequence instruction
 */
FindEasterBunnyHQ.prototype.hopAlongTheBlocks = function () {
    this.parsedSequence.forEach(function (instruction) {
        console.log('parsing instruction', instruction);
        this.direction.turn(instruction.turn);
        this.position.updatePosition(instruction.distance, this.direction.vector);
    }.bind(this));
};


module.exports = FindEasterBunnyHQ;