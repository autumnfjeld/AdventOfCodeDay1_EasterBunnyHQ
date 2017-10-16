# Advent of Code Day1: EasterBunnyHQ App

This EasterBunnyHQ node app computes the shortest distance, in number of city blocks on a [Cartesian city grid](https://en.wikipedia.org/wiki/Taxicab_geometry), from a start point [0,0] to the Easter Bunny HQ. 


### Development Environment
* Mac OS X El Capitan version 10.11.6 (15G1217).
* Node v6.0.0


### How to run this app locally
 * Install [node](getlink) if necessary
 * Clone or download this repo
 * In your terminal, `cd` to the root directory and run:  `npm install`
 * To run the app with the given (hardcoded) input:  `npm run goBunny`
    * The minimum number of blocks Dr. Bunny could travel to reach Easter Bunny HQ is reported in your terminal.
 
### Testing
* Run the EBHQ App tests with the [example data](http://adventofcode.com/2016/day/1) provided by Advent of Code:  `npm test`
 
### Overview
This repo is a node app that solves the [2016 Advent of Code Day 1 problem](http://adventofcode.com/2016/day/1).  In summary, one must traverse a specific path on a [city grid](https://en.wikipedia.org/wiki/Taxicab_geometry) to get to Easter Bunny Headquarters (EBHQ).  The path is given in a sequence of instructions of the form R1, L3, L2, meaning go right one block, then go left three blocks, then go left two blocks.  Given the restriction that one can only traverse along the city blocks (one cannot travel as the crow flies) the task is to find the shortest distance in city blocks from the starting point to the EBHQ. 
 
### Discussion
In my code Dr. Bunny finds the Easter Bunny HQ by 'theoretically' traversing the grid according to the provided input sequence.  Once EBHQ is located, the minimum number of blocks that Dr. Bunny could hop along to get to EBHQ is computed.

The solution is written as a node app.  
##### Input
The input from Advent of Code is a sequence of instructions such as R5, L5, R5, R3 that are fed into the program as an array of strings `['R5', 'L5', 'R5', 'R3']`.  The app parses each string into turn direction and distance to travel in the form `{turn: 'R', distance: 5}`. 
  
##### Computations
The starting point is [0,0] on the Cartesian grid and all blocks are assumed to be equidistant squares.

I ran the test input through some hand calculations to look for patterns in direction vector as a function of right/left turns (a linear algebra problem is in there) and sketched the path of a the sequence on a Cartesian grid to get a visual of N (+y), E (+x), S(-y), W(-x) facing directions in terms of right and left turns.  Expressed as direction vectors on a Cartesian grid, the four cardinal directions are: `N=[0,1]`, `E=[1,0]`, `S=[0,-1]`, `W=[-1,0]`.  I concluded that if the current direction is North/South a right turn will swap the scalar values and persist the sign of new direction vector in the x,y grid, while if the current direction is East/West a right turn will negate the sign of new direction vector.
 
I have recently gone through some of the lessons in [udemy's Python for Data Science and Machine Learning] course(https://www.udemy.com/python-for-data-science-and-machine-learning-bootcamp) and NumPy might be an interesting tool to approach this from a linear algebra perspective, had I written this in python I might have played more with the linear algebra nature of the problem. Alternatively, a quick google search revealed a number of linear algebra javascript libraries.  But to keep things simple the change in direction vector due to a 90 degree right or left turn was compute via a simple swap of x,y coordinates and the appropriate sign change.  For example when facing North [0,1] a right turn results in a West facing [1,0] direction vector.
 
 Once the turn instruction is transformed into a new direction vector the distance along the -/+x or -/+y direction is added to the current [x,y] position. This repeats through each of the input sequence instructions until the EBHQ is reached and its coordinates are then known.  Using the EBHQ coordinates and the [0,0] start coordinates the minimum number of blocks  to to get to HQ is computer.
 

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
