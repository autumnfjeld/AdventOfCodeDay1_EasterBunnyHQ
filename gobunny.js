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
 * Tracks the direction in which Dr. Bunny is facing as she 'theoretically' moves about the grid
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
 * Tracks the position of Dr. Bunny in the city grid in terms of a Cartesian grid
 * @constructor
 */
function Position() {
    this.x = 0;
    this.y = 0;
}

/**
 * Finds the location of the Easter Bunny HQ from a given sequence of movements in a city grid
 * @param {Array} sequence
 * @constructor
 */
function FindEasterBunnyHQ(sequence){
    this.direction = new Direction();
    this.position = new Position();
    this.minimumBlocksAway = null;
    console.log('Check FindEasterBunnyHQ', this);
}


module.exports = FindEasterBunnyHQ;