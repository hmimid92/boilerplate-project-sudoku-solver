const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const puzzleWrong = '1.5..2.84..63.12.7.2..5.....9..1....8.2.5674.3.7.2..9.47...8..1..16....926914.37.';
const puzzleLength = '1.5..2.84..63.12.7.2..5....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const puzzleCharcter = '1.5..2.84.D63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
const solvedP = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

suite('Functional Tests', () => {
    suite('POST tests', function () {
        test('Solve a puzzle with valid puzzle string', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
              "puzzle": puzzle
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.solution, solvedP);
              done();
            });
        });    
        test('Solve a puzzle with missing puzzle string', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
              "puzzle": ''
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error, 'Required field missing');
              done();
            });
        });     
        test('Solve a puzzle with invalid characters', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
              "puzzle": puzzleCharcter
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error, 'Invalid characters in puzzle');
              done();
            });
        });
        test('Solve a puzzle with incorrect length', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
              "puzzle": puzzleLength
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
              done();
            });
        });
        test('Solve a puzzle that cannot be solved', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/solve')
            .send({
              "puzzle": puzzleWrong
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error, 'Puzzle cannot be solved');
              done();
            });
        });
        test('Check a puzzle placement with all fields', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A2',
              'value': '3'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.isTrue(res.body.valid);
              done();
            });
        });
        test('Check a puzzle placement with single placement conflict', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A2',
              'value': '8'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.isFalse(res.body.valid);
              assert.equal(res.body.conflict[0],'row');
              done();
            });
        });
        test('Check a puzzle placement with multiple placement conflicts', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A2',
              'value': '6'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.isFalse(res.body.valid);
              assert.equal(res.body.conflict[0],'column');
              assert.equal(res.body.conflict[1],'region');
              done();
            });
        });
        test('Check a puzzle placement with all placement conflicts', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A1',
              'value': '2'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.isFalse(res.body.valid);
              assert.equal(res.body.conflict[0],'row');
              assert.equal(res.body.conflict[1],'column');
              assert.equal(res.body.conflict[2],'region');
              done();
            });
        });
        test('Check a puzzle placement with missing required fields', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A1'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error,'Required field(s) missing');
              done();
            });
        });
        test('Check a puzzle placement with invalid characters', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzleCharcter,
              'coordinate':'A1',
              'value': '3'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error,'Invalid characters in puzzle');
              done();
            });
        });
        test('Check a puzzle placement with incorrect length', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzleLength,
              'coordinate':'A1',
              'value': '7'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error,'Expected puzzle to be 81 characters long');
              done();
            });
        });
        test('Check a puzzle placement with invalid placement coordinate', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A11',
              'value': '3'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error,'Invalid coordinate');
              done();
            });
        });
        test('Check a puzzle placement with invalid placement value', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({
              'puzzle':puzzle,
              'coordinate':'A1',
              'value': '38'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type,'application/json');
              assert.equal(res.body.error,'Invalid value');
              done();
            });
        });
      });
});

