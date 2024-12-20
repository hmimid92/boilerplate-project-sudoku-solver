'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
 
  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let val = req.body.value;
      let coordinatt = req.body.coordinate;
      
      if(!puzzleString || !coordinatt || !val ) {
        res.json({ error: 'Required field(s) missing' });
        return;
      } 

      if(!(/^[A-I][1-9]$/.test(coordinatt))) {
        res.json({ error: 'Invalid coordinate'});
         return;
      }

      if(!solver.validate(puzzleString)) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
         return;
      } 
      if(!(Number(val) < 10 && Number(val) > 0 )) {
          res.json({ error: 'Invalid value' });
          return;
        } 
          
      if(!(puzzleString.split('').every(el => (Number(el) < 10 && Number(el) > 0) || (el === '.') ))) {
        res.json({ error: 'Invalid characters in puzzle' });
         return;
      }

      let row = coordinatt.split("")[0];
      let col = Number(coordinatt.split("")[1])-1;
      switch(row) {
        case 'A': row = 0;
                 break;
        case 'B': row = 1;
                 break; 
        case 'C': row = 2;
                 break;        
        case 'D': row = 3;
                 break;
        case 'E': row = 4;
                 break; 
        case 'F': row = 5;
                 break;
        case 'G': row = 6;
                 break;
        case 'H': row = 7;
                 break; 
        case 'I': row = 8;
                 break;  
        default: 
              row = 'invalid';               
      }
      
      let arr1 = [],
      arr2 = [], 
      arr3 = [],
      arr4 = [], 
      arr5 = [],
      arr6 = [], 
      arr7 = [],
      arr8 = [], 
      arr9 = [];
    let sudoko = [];
    let arrAll = puzzleString.split("");
    
    arrAll.forEach((el,i) => {
      if(i < 9) {
        arr1.push(el);
      } else if(i < 18) {
        arr2.push(el);
      } else if(i < 27) {
        arr3.push(el);
      } else if(i < 36) {
        arr4.push(el);
      } else if(i < 45) {
        arr5.push(el);
      } else if(i < 54) {
        arr6.push(el);
      } else if(i < 63) {
        arr7.push(el);
      } else if(i < 72) {
        arr8.push(el);
      } else if(i < 81) {
        arr9.push(el);
      }
    });
      sudoko.push(arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,arr9);
    if(sudoko[row][col] === val) {
      sudoko[row][col] = '.';
      puzzleString = sudoko.flat().join('');
      if(
         solver.checkRowPlacement(puzzleString,row,col,val) &&
         solver.checkColPlacement(puzzleString,row,col,val) &&
         solver.checkRegionPlacement(puzzleString,row,col,val)
       ) {
         res.json({ "valid": true });
         return;
       }
    } else {
      let validRow, validCol, validReg, conflict = [];
      if(solver.checkRowPlacement(puzzleString,row,col,val)) { 
        validRow = true;
    } else {
        conflict.push("row");
    }
   if(solver.checkColPlacement(puzzleString,row,col,val)) {
        validCol = true;
      } else {
        conflict.push("column");
      }
   if(solver.checkRegionPlacement(puzzleString,row,col,val)) {
        validReg = true;
   } else {
        conflict.push("region");
   }
   if(conflict.length === 0) {
    res.json({ "valid": validRow && validReg && validCol });
    return;
   } else {
    res.json({ 
      "valid": false,
      "conflict": conflict
    });
    return;
   }
    }
   });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString =req.body.puzzle;
      if(!puzzleString) {
        res.json({ error: 'Required field missing' });
        return;
      } 
      if(!puzzleString.split('').every(el => /[1-9]|\./g.test(el))) {
        res.json({ error: 'Invalid characters in puzzle' });
         return;
      }
        if(!solver.validate(puzzleString)) {
          res.json({ error: 'Expected puzzle to be 81 characters long' });
           return;
        }
        if(!solver.solve(puzzleString)) {
          res.json({ error: 'Puzzle cannot be solved' });
        } else {
          res.json({ solution: solver.solve(puzzleString)});
        }
    });
};
