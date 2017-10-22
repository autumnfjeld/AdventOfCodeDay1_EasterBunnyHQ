'use strict';

/****************************************************************************
 *  Easter Bunny HQ App
 *
 *  Assumptions/Decisions
 *  - Grid is comprised of squares, every block is equidistant
 *  - Dr. Bunny is 'theoretically' moving about the grid in order to compute the location of Easter
 *    Bunny HQ and comments below refer to her in this sense
 *  - Start position is [0,0] on Cartesian grin
 *
 ****************************************************************************/


/**
 * Track the direction in which Dr. Bunny is facing as she 'theoretically' moves about the grid
 * Initial direction is facing north
 * Cardinal direction vectors in a Cartesian grid:  North [0, 1], South [0, -1], East [1,0], West [-1,0]
 * @constructor
 */
function Direction() {
    this.cardinalDirectionVectors = [
        [0,1],      // North
        [1,0],      // East
        [0,-1],     // South
        [-1, 0]     // West
    ];
    // Dr. Bunny initially faces North
    this.directionVectorIndex = 0;
}

/**
 * Compute the new direction vector that results from a R turn (clockwise) or L turn (counterclockwise)
 * Clockwise rotation increments the index of the cardinalDirectionVectors array, cycling through 0,1,2,3,0,1...
 * Counterclockwise rotation decrements the index of the cardinalDirectionVectors array, cycling through 0,3,3,2,1,0...
 * @param {string} turnDirection
 */
Direction.prototype.turn = function (turnDirection) {
    if (!turnDirection) {
        console.error('Dr. Bunny cannot turn without a turnDirection. Check the program input.');
        return;
    }
    if (turnDirection === 'R') {
        this.directionVectorIndex = this.directionVectorIndex === 3 ? 0 : ++this.directionVectorIndex;
    } else {
        this.directionVectorIndex = this.directionVectorIndex === 0 ? this.cardinalDirectionVectors.length - 1 : --this.directionVectorIndex;
    }
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
 * @param {number} distance
 * @param {Array} directionVector
 */
Position.prototype.updatePosition = function (distance, directionVector) {
    if (!distance || !directionVector) {
        console.error('Cannot move Dr. Bunny without distance and direction vector. Check the program input.');
        return;
    }
    if (directionVector[0] === 0) {
        this.y += distance * directionVector[1];
    } else {
        this.x += distance * directionVector[0];
    }
};



/**
 * Find the location of the Easter Bunny HQ from a given sequence of movements in a city grid
 * @param {Array} sequence - array of strings
 * @constructor
 */
function FindEasterBunnyHQ(sequence) {
    if (!sequence) {
        console.error('FindEasterBunnyHQ requires a sequence of movements. Check the program input.');
        return;
    }
    this.direction = new Direction();
    this.position = new Position();
    this.minimumBlocksAway = null;
    this.parsedSequence = this.parseSequence(sequence);
}

/**
 * Break the sequence strings into turn direction and travel distance
 * @param {Array} sequence
 * @returns {Object}
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
 * Get Dr. Bunny on her way, this starts the computation of movement in the Cartesian grid
 */
FindEasterBunnyHQ.prototype.go = function(){
    this.hopAlongTheBlocks();
    this.computeMinBunnyBlocks();
    console.log('  *********************************************************************************');
    console.log( '  Dr. Bunny could get from her start point to Easter Bunny HQ in a mere', this.minimumBlocksAway, 'blocks.');
    console.log('  *********************************************************************************');
};

/**
 * Move Dr. Bunny through the grid by computing the new direction and distance traveled for each sequence instruction
 */
FindEasterBunnyHQ.prototype.hopAlongTheBlocks = function () {
    this.parsedSequence.forEach(function (instruction) {
        this.direction.turn(instruction.turn);
        var directionVector = this.direction.cardinalDirectionVectors[this.direction.directionVectorIndex];
        this.position.updatePosition(instruction.distance, directionVector);
    }.bind(this));
};

/**
 * Compute the minimum number of blocks Dr. Bunny could travel to get from her start position to final position
 * Start position is [0,0]
 */
FindEasterBunnyHQ.prototype.computeMinBunnyBlocks = function () {
    this.minimumBlocksAway = Math.abs(this.position.x) + Math.abs(this.position.y);
};


/****************************************************************************
 *  Run Easter Bunny HQ App with input data
 ****************************************************************************/

/**
 * Export function to call via npm script tor run app with specified input data
 * @returns {number}
 */
function run() {
    // My puzzle input from my http://adventofcode.com/2016/day/1/input
    var input = {
        sequence: ['L2', 'L3', 'L3', 'L4', 'R1', 'R2', 'L3', 'R3', 'R3', 'L1', 'L3', 'R2', 'R3', 'L3', 'R4', 'R3', 'R3', 'L1', 'L4', 'R4', 'L2', 'R5', 'R1', 'L5', 'R1', 'R3', 'L5', 'R2', 'L2', 'R2', 'R1', 'L1', 'L3', 'L3', 'R4', 'R5', 'R4', 'L1', 'L189', 'L2', 'R2', 'L5', 'R5', 'R45', 'L3', 'R4', 'R77', 'L1', 'R1', 'R194', 'R2', 'L5', 'L3', 'L2', 'L1', 'R5', 'L3', 'L3', 'L5', 'L5', 'L5', 'R2', 'L1', 'L2', 'L3', 'R2', 'R5', 'R4', 'L2', 'R3', 'R5', 'L2', 'L2', 'R3', 'L3', 'L2', 'L1', 'L3', 'R5', 'R4', 'R3', 'R2', 'L1', 'R2', 'L5', 'R4', 'L5', 'L4', 'R4', 'L2', 'R5', 'L3', 'L2', 'R4', 'L1', 'L2', 'R2', 'R3', 'L2', 'L5', 'R1', 'R1', 'R3', 'R4', 'R1', 'R2', 'R4', 'R5', 'L3', 'L5', 'L3', 'L3', 'R5', 'R4', 'R1', 'L3', 'R1', 'L3', 'R3', 'R3', 'R3', 'L1', 'R3', 'R4', 'L5', 'L3', 'L1', 'L5', 'L4', 'R4', 'R1', 'L4', 'R3', 'R3', 'R5', 'R4', 'R3', 'R3', 'L1', 'L2', 'R1', 'L4', 'L4', 'L3', 'L4', 'L3', 'L5', 'R2', 'R4', 'L2']
    };

    var bunnyTrip = new FindEasterBunnyHQ(input.sequence);
    bunnyTrip.go();
    return bunnyTrip.minimumBlocksAway;
}


module.exports = {
    FindEasterBunnyHQ: FindEasterBunnyHQ,
    run: run
};

require('make-runnable');
