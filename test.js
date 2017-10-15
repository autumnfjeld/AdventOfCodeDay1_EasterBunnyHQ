'use strict';

var FindEasterBunnyHQ = require("./gobunny.js");

/**
 * Test EasterBunnyHQ using the provided examples from http://adventofcode.com/2016/day/1
 */

/**
 *
 * @param {Array} testInput - array of objects with test input and expected result
 * @constructor
 */
function Test(testInput) {
    this.testInput = testInput;
}

/**
 * Execute running the EasterBunnyHQ app and checks results
 */
Test.prototype.runTest = function () {
    console.log('\n****** Running FindEasterBunnyHQ Tests ******\n', this.testInput);
    var bunnyTrip;
    this.testInput.forEach(function (input) {
        console.log('\n___Test ', input.id, '___');
        bunnyTrip = new FindEasterBunnyHQ(input.sequence);
        console.log('Test ', input.id, 'Result |  Expected Blocks:', input.expectedBlocksAway, ' Actual Blocks:', bunnyTrip.minimumBlocksAway);
        if (bunnyTrip.minimumBlocksAway === input.expectedBlocksAway) {
            console.log('Yipee!  Test passed!');
        } else {
            console.log('UhOh. Test failed. :( ');
        }
    });
};

var testInput = [
    {
        id: 1,
        sequence: ['R2', 'L3'],
        expectedBlocksAway: 5
    },
    {
        id: 2,
        sequence: ['R2', 'R2', 'R2'],
        expectedBlocksAway: 2
    },
    {
        id: 3,
        sequence: ['R5', 'L5', 'R5', 'R3'],
        expectedBlocksAway: 12
    }
];

/**
 * Export function to call via npm script command using make-runnable module
 */
function run() {
    var test = new Test(testInput);
    test.runTest();
}

module.exports = run;

require('make-runnable');
