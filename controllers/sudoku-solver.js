class SudokuSolver {

  validate(puzzleString) {
    let characterNumber = puzzleString.split("").length;
    return characterNumber === 81 ? true : false;
   }

 checkRowPlacement(puzzleString, row, column, value) {
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
        if(sudoko[row].includes(value)) {
          return false;
        } else {
          return true;
        }
  }
  
 checkColPlacement(puzzleString, row, column, value) {
  let arr1 = [],
      arr2 = [], 
      arr3 = [],
      arr4 = [], 
      arr5 = [],
      arr6 = [], 
      arr7 = [],
      arr8 = [], 
      arr9 = [];
  let col1 = [],
      col2 = [], 
      col3 = [],
      col4 = [], 
      col5 = [],
      col6 = [], 
      col7 = [],
      col8 = [], 
      col9 = [];
    let sudoko = [],sudoko1 = [];
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
      for(let i =0;i<9;i++) {
        col1.push(sudoko[i][0]);
        col2.push(sudoko[i][1]);
        col3.push(sudoko[i][2]);
        col4.push(sudoko[i][3]);
        col5.push(sudoko[i][4]);
        col6.push(sudoko[i][5]);
        col7.push(sudoko[i][6]);
        col8.push(sudoko[i][7]);
        col9.push(sudoko[i][8]);
      }
      sudoko1.push(col1,col2,col3,col4,col5,col6,col7,col8,col9); 
        if(sudoko1[column].includes(value)) {
          return false;
        } else {
          return true;
        }
   }
  
 checkRegionPlacement(puzzleString, row, column, value) {
    let arr1 = [],
      arr2 = [], 
      arr3 = [],
      arr4 = [], 
      arr5 = [],
      arr6 = [], 
      arr7 = [],
      arr8 = [], 
      arr9 = [];
  let reg1 = [],
      reg2 = [], 
      reg3 = [],
      reg4 = [], 
      reg5 = [],
      reg6 = [], 
      reg7 = [],
      reg8 = [], 
      reg9 = [];
    let sudoko = [],sudoko1 = [];
    let arrAll = puzzleString.split("");
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
    for(let i =0;i<9;i++) {
        if(i < 3) {
          reg1.push(arr1[i]);
          reg1.push(arr2[i]);
          reg1.push(arr3[i]);
          reg2.push(arr4[i]);
          reg2.push(arr5[i]);
          reg2.push(arr6[i]);
          reg3.push(arr7[i]);
          reg3.push(arr8[i]);
          reg3.push(arr9[i]);
        } else if(i < 6) {
          reg4.push(arr1[i]);
          reg4.push(arr2[i]);
          reg4.push(arr3[i]);
          reg5.push(arr4[i]);
          reg5.push(arr5[i]);
          reg5.push(arr6[i]);
          reg6.push(arr7[i]);
          reg6.push(arr8[i]);
          reg6.push(arr9[i]);
        } else {
          reg7.push(arr1[i]);
          reg7.push(arr2[i]);
          reg7.push(arr3[i]);
          reg8.push(arr4[i]);
          reg8.push(arr5[i]);
          reg8.push(arr6[i]);
          reg9.push(arr7[i]);
          reg9.push(arr8[i]);
          reg9.push(arr9[i]);
        }
      }
    sudoko1.push(reg1,reg2,reg3,reg4,reg5,reg6,reg7,reg8,reg9);
    if(row < 3 && column < 3) {
        if(reg1.includes(value)) {
          return false;
        } else {
          return true;
        } 
    }
    
    if(row < 3 && (column < 6 && column >=3)) {
        if(reg4.includes(value)) {
          return false;
        } else {
          return true;
        } 
    }
  
     if(row < 3 && (column <9 && column >=6)) {
        if(reg7.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
  
    if((row < 6 && row >= 3) && column <3) {
        if(reg2.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
    if((row < 6 && row >= 3) && (column <6 && column >= 3)) {
        if(reg5.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
   if((row < 6 && row >= 3) && (column <9 && column >= 6)) {
        if(reg8.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
    if((row < 9 && row >= 6) && column <3) {
        if(reg3.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
  
    if((row < 9 && row >= 6) && (column <6 && column >= 3)) {
        if(reg6.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
  
    if((row < 9 && row >= 6) && (column <9 && column >= 6)) {
        if(reg9.includes(value)) {
          return false;
        } else {
          return true;
        }
    }
  }

 solve(puzzleString) { 
   let puzzleSolved;
   function solvePuzzle(puzzleString) {

      function isValid(board, row, col, k) {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
              return false;
            }
        }
        return true;
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
      for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoko[i][j] == '.') {
          for (let k = 1; k <= 9; k++) {
            if (isValid(sudoko, i, j, k)) {
              sudoko[i][j] = `${k}`;
            if (solvePuzzle(sudoko.flat().join(''))) {
             return true;
            } else {
             sudoko[i][j] = '.';
            }
           }
         }
         return false;
       }
     }
   }
   puzzleSolved = sudoko.flat().join('');
   }
   solvePuzzle(puzzleString);
   return puzzleSolved;
 }
}

module.exports = SudokuSolver;

