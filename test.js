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
function Test(testInput){
    this.testInput = testInput;
}

/**
 * Executes running the EasterBunnyHQ app and checks results
 */
Test.prototype.runTest = function(){
    console.log('\n****** Running Tests ****** \nFindEasterBunnyHQ', this.testInput);
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

var tempTest = new Test(testInput);
tempTest.runTest();

