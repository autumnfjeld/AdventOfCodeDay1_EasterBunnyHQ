# Advent of Code Day1: EasterBunnyHQ App

This EasterBunnyHQ node app computes the shortest Manhattan distance, in number of city blocks, on a [city grid](https://en.wikipedia.org/wiki/Taxicab_geometry), from a starting position [0,0] to the Easter Bunny Headquarters (EBHQ).  The city grid is represented as a fixed [Cartesian coordinate system](https://en.wikipedia.org/wiki/Coordinate_system#Cartesian_coordinate_system). 

### Development Environment
* Mac OS X El Capitan version 10.11.6 (15G1217).
* Node v6.0.0
* npm module [make-runnable](https://www.npmjs.com/package/make-runnable) is used to run exported functions via the npm scripts commands

### How to run this app locally
 * Install [node](https://nodejs.org) if necessary
 * Clone or download this repo
 * In your terminal, `cd` to the root directory and run:  `npm install`
 * To run the app with the given (hardcoded) input:  `npm run goBunny`
 * The minimum number of blocks one could travel to reach Easter Bunny HQ is reported in your terminal.
 
### Testing
Run the EBHQ App tests with the [example data](http://adventofcode.com/2016/day/1) provided by Advent of Code:  `npm test`
 
### Overview
This repo contains a vanilla javascript node app that solves the [2016 Advent of Code Day 1 problem](http://adventofcode.com/2016/day/1).  In summary, one must traverse a specific path on a [city grid](https://en.wikipedia.org/wiki/Taxicab_geometry) to locate the Easter Bunny Headquarters.  A path to HQ is provided in a sequence of instructions of the form R1, L3, L2, meaning go right one block, then go left three blocks, then go left two blocks.  Given the restriction that one can only traverse along the city blocks (one cannot travel as the crow flies) the task is to find the shortest Manhattan distance in city blocks from the starting point to the EBHQ. It is assumed that the given path is a meandering path, perhaps a scenic tour of the city, and not the shortest distance. 
 
### Discussion
In my code Dr. Bunny is dropped into the city and finds the Easter Bunny HQ by 'theoretically' traversing the grid according to the provided input sequence.  Once the EBHQ position is located, the minimum number of blocks that Dr. Bunny could hop along to get to EBHQ is computed.

##### Input
The input from Advent of Code is a sequence of instructions such as R5, L5, R5, R3 that are fed into the program as an array of strings `['R5', 'L5', 'R5', 'R3']`.  The app parses each string into turn direction and distance to travel in the form `{turn: 'R', distance: 5}`. 
  
##### Computations
The starting point is assumed to be [0,0] on the Cartesian grid and all blocks are assumed to be equidistant squares.  The problem states Dr. Bunny is facing north when dropped into the city grid.

Expressed as direction vectors on a Cartesian grid, the four cardinal directions are grouped in an array representing the clockwise rotation from North to West : `var cardinalDirectionVectors = [[0,1],[1,0],[0,-1],[-1,0]]`. A 90 degree right turn is a clockwise turn and a 90 degree left turn is counterclockwise turn and thus the change in direction vector can be determined incrementing or decrementing the array index. (An increment at index 3 goes to index 0, and a decrement at index 0 goes to index 3.)
 

 
 Once the new direction vector is determined from the turn instruction, the distance to walk/hop/travel is multiplied by the direction vector to compute the distance moved in either the x or y direction.  This distance is added is added to the current [x,y] position. This repeats through each of the input sequence instructions.  The final [x,y] coordinates reveal the location of the EBHQ.  Using the EBHQ coordinates and the [0,0] start coordinates the minimum number of blocks to get to HQ is computed as the sum of the absolute value of the x coordinate and the y coordinate.
 
##### Output
The node app will print the minimum number of blocks in the terminal window as:  
 `Dr. Bunny could get from her start point to Easter Bunny HQ in a mere 301 blocks.`
##### Example
**Input Sequence:**  `[ 'R2', 'R2', 'R2' ]`

**Output Minimum Blocks:** `Dr. Bunny could get from her start point to Easter Bunny HQ in a mere 2 blocks.`

#### License
This project is licensed under the MIT License - see the LICENSE.md file for details


#### Acknowledgments

I have often used [TasteJS](https://github.com/tastejs/todomvc)'s [todomvc](https://github.com/tastejs/todomvc) repo and Howard Tang's [giraffeMaker](https://github.com/aychtang/giraffeMaker) repo as guides for structuring vanilla javascript apps.  You will see the patterns from the giraffeMaker pseudoClassical approach in this app.  

References for a good README 
 http://blog.lookahead.com.au/post/98298040306 
 https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
