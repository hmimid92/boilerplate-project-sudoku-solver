const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const solver = new Solver();
const puzzle2 = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const puzzle3 = '..9..5.1.86.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const puzzleSolved = '218396745753284196496157832531672984649831257827549613962415378185763429374928561'; 

suite('Unit Tests', () => {
    test("read a whole number input", function() {
        assert.isTrue(solver.validate(puzzle),"string is of 81 characters");
      });
    test("puzzle string with invalid characters", function() {
        assert.isTrue(solver.validate('1.5..2.84X.63.12.7.2..5.h...9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'));
      });
    test("a puzzle string that is not 81 characters in length", function() {
        assert.isFalse(solver.validate('1.5..2.84..63.12.7.2..5.....9..1...8.2.3674.3.7.2..9.47...8..1..16....926914.37.'),"string is not of 81 characters");
      });
    test("a valid row placement", function() {
        assert.isTrue(solver.checkRowPlacement(puzzle,'A',0,'6'));
      });
    test("an invalid row placement", function() {
        assert.isFalse(solver.checkRowPlacement(puzzle,'A',0,'5'));
      });
    test("a valid column placement", function() {
        assert.isTrue(solver.checkColPlacement(puzzle,'A',0,'3'));
      }); 
    test("an invalid column placement", function() {
        assert.isFalse(solver.checkColPlacement(puzzle,'A',0,'6'));
      });
    test("a valid region (3x3 grid) placement", function() {
        assert.isTrue(solver.checkRegionPlacement(puzzle,'A',0,'6'));
      });
    test("an invalid region (3x3 grid) placement", function() {
        assert.isFalse(solver.checkRegionPlacement(puzzle,'A',0,'2'));
      });
    test("Valid puzzle strings pass the solver", function() {
        assert.notEqual(solver.solve(puzzle),undefined);
      });
    test("Invalid puzzle strings fail the solver", function() {
        assert.equal(solver.solve(puzzle3),undefined);
      });
    test("expected solution for an incomplete puzzle", function() {
        assert.equal(solver.solve(puzzle2),puzzleSolved);
      });
});
