// script.js

// Define an array of crosswords (for simplicity, only two crosswords are defined here)
// You can add more crosswords to the array to have a total of five.
const successAudio = document.getElementById('success-audio'); // If you have this

// script.js

const crosswords = [
    {
      // Crossword 1
      grid: [
        [{ letter: '', number: 1 }, { letter: '', number: 2 }, { letter: '', number: 3 }, { black: true }, { letter: '', number: 4 }],
        [{ letter: '', number: 5 }, { black: true }, { letter: '', number: 6 }, { letter: '', number: 7 }, { letter: '', number: 8 }],
        [{ letter: '', number: 9 }, { letter: '', number: 10 }, { black: true }, { letter: '', number: 11 }, { letter: '', number: 12 }],
        [{ black: true }, { letter: '', number: 13 }, { letter: '', number: 14 }, { black: true }, { letter: '', number: 15 }],
        [{ letter: '', number: 16 }, { letter: '', number: 17 }, { letter: '', number: 18 }, { letter: '', number: 19 }, { black: true }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'Opposite of night', cells: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }] },
          { number: 4, clue: 'Animal that meows', cells: [{ row: 0, col: 4 }] },
          { number: 5, clue: 'Male child', cells: [{ row: 1, col: 0 }] },
          { number: 6, clue: 'Frozen water', cells: [{ row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }] },
          { number: 9, clue: 'First meal of the day', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }] },
          { number: 11, clue: 'Not heavy', cells: [{ row: 2, col: 3 }, { row: 2, col: 4 }] },
          { number: 13, clue: 'Baby\'s bed', cells: [{ row: 3, col: 1 }, { row: 3, col: 2 }] },
          { number: 16, clue: 'Greeting word', cells: [{ row: 4, col: 0 }, { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 }] },
        ],
        down: [
          { number: 1, clue: 'Feline animal', cells: [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }] },
          { number: 2, clue: 'Expression of pain', cells: [{ row: 0, col: 1 }, { row: 2, col: 1 }] },
          { number: 3, clue: 'To sit or lie down', cells: [{ row: 0, col: 2 }, { row: 1, col: 2 }] },
          { number: 6, clue: 'Frozen water', cells: [{ row: 1, col: 2 }, { row: 2, col: 2 }] },
          { number: 7, clue: 'Opposite of yes', cells: [{ row: 1, col: 3 }, { row: 2, col: 3 }] },
          { number: 8, clue: 'Negative vote', cells: [{ row: 1, col: 4 }, { row: 2, col: 4 }] },
          { number: 12, clue: 'Third planet from the sun', cells: [{ row: 2, col: 4 }, { row: 3, col: 4 }] },
          { number: 14, clue: 'Consumed food', cells: [{ row: 3, col: 2 }, { row: 4, col: 2 }] },
          { number: 17, clue: 'Container for tea', cells: [{ row: 4, col: 1 }, { row: 3, col: 1 }] },
        ],
      },
      answers: {
        across: {
          1: 'DAY',
          4: 'CAT',
          5: 'SON',
          6: 'ICE',
          9: 'BREAKFAST',
          11: 'LIGHT',
          13: 'CRIB',
          16: 'HELLO',
        },
        down: {
          1: 'DOG',
          2: 'AH',
          3: 'YET',
          6: 'ICE',
          7: 'NO',
          8: 'NO',
          12: 'EARTH',
          14: 'ATE',
          17: 'POT',
        },
      },
    },
    {
      // Crossword 2
      grid: [
        [{ letter: '', number: 1 }, { letter: '', number: 2 }, { letter: '', number: 3 }, { letter: '', number: 4 }, { letter: '', number: 5 }],
        [{ black: true }, { letter: '', number: 6 }, { black: true }, { letter: '', number: 7 }, { black: true }],
        [{ letter: '', number: 8 }, { letter: '', number: 9 }, { letter: '', number: 10 }, { letter: '', number: 11 }, { letter: '', number: 12 }],
        [{ black: true }, { letter: '', number: 13 }, { black: true }, { letter: '', number: 14 }, { black: true }],
        [{ letter: '', number: 15 }, { letter: '', number: 16 }, { letter: '', number: 17 }, { letter: '', number: 18 }, { letter: '', number: 19 }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'Opposite of old', cells: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }] },
          { number: 6, clue: 'Long fish', cells: [{ row: 1, col: 1 }] },
          { number: 7, clue: 'Cooking vessel', cells: [{ row: 1, col: 3 }] },
          { number: 8, clue: 'Large body of water', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }] },
          { number: 13, clue: 'Not soft', cells: [{ row: 3, col: 1 }] },
          { number: 14, clue: 'Distant', cells: [{ row: 3, col: 3 }] },
          { number: 15, clue: 'Expression of surprise', cells: [{ row: 4, col: 0 }, { row: 4, col: 1 }, { row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 }] },
        ],
        down: [
          { number: 1, clue: 'Large wild cat', cells: [{ row: 0, col: 0 }, { row: 2, col: 0 }, { row: 4, col: 0 }] },
          { number: 2, clue: 'Preposition indicating direction', cells: [{ row: 0, col: 1 }, { row: 2, col: 1 }, { row: 4, col: 1 }] },
          { number: 3, clue: 'Equal', cells: [{ row: 0, col: 2 }, { row: 2, col: 2 }, { row: 4, col: 2 }] },
          { number: 4, clue: 'Consume', cells: [{ row: 0, col: 3 }, { row: 2, col: 3 }, { row: 4, col: 3 }] },
          { number: 5, clue: 'Electrical unit', cells: [{ row: 0, col: 4 }, { row: 2, col: 4 }, { row: 4, col: 4 }] },
          { number: 6, clue: 'Long fish', cells: [{ row: 1, col: 1 }, { row: 2, col: 1 }] },
          { number: 8, clue: 'Large body of water', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }] },
          { number: 13, clue: 'Not soft', cells: [{ row: 3, col: 1 }, { row: 4, col: 1 }] },
          { number: 14, clue: 'Distant', cells: [{ row: 3, col: 3 }, { row: 4, col: 3 }] },
        ],
      },
      answers: {
        across: {
          1: 'NEWLY',
          6: 'EEL',
          7: 'POT',
          8: 'OCEAN',
          13: 'HARD',
          14: 'FAR',
          15: 'OOPS',
        },
        down: {
          1: 'NOO',
          2: 'ECO',
          3: 'WED',
          4: 'LAP',
          5: 'YEN',
          6: 'EEL',
          8: 'OCEAN',
          13: 'HA',
          14: 'FA',
        },
      },
    },
    {
      // Crossword 3
      grid: [
        [{ letter: '', number: 1 }, { letter: '', number: 2 }, { black: true }, { letter: '', number: 3 }, { letter: '', number: 4 }],
        [{ letter: '', number: 5 }, { letter: '', number: 6 }, { letter: '', number: 7 }, { letter: '', number: 8 }, { letter: '', number: 9 }],
        [{ black: true }, { letter: '', number: 10 }, { black: true }, { letter: '', number: 11 }, { black: true }],
        [{ letter: '', number: 12 }, { letter: '', number: 13 }, { letter: '', number: 14 }, { letter: '', number: 15 }, { letter: '', number: 16 }],
        [{ letter: '', number: 17 }, { letter: '', number: 18 }, { black: true }, { letter: '', number: 19 }, { letter: '', number: 20 }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'First number', cells: [{ row: 0, col: 0 }, { row: 0, col: 1 }] },
          { number: 3, clue: 'An adult male human', cells: [{ row: 0, col: 3 }, { row: 0, col: 4 }] },
          { number: 5, clue: 'Companion', cells: [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }] },
          { number: 12, clue: 'Close by', cells: [{ row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }] },
          { number: 17, clue: 'Negative word', cells: [{ row: 4, col: 0 }, { row: 4, col: 1 }] },
          { number: 19, clue: 'Walking stick', cells: [{ row: 4, col: 3 }, { row: 4, col: 4 }] },
        ],
        down: [
          { number: 1, clue: 'Rain protection', cells: [{ row: 0, col: 0 }, { row: 1, col: 0 }] },
          { number: 2, clue: 'At that time', cells: [{ row: 0, col: 1 }, { row: 1, col: 1 }] },
          { number: 6, clue: 'Tree fluid', cells: [{ row: 1, col: 1 }, { row: 3, col: 1 }] },
          { number: 7, clue: 'Third person pronoun', cells: [{ row: 1, col: 2 }, { row: 3, col: 2 }] },
          { number: 8, clue: 'Compass point', cells: [{ row: 1, col: 3 }, { row: 3, col: 3 }] },
          { number: 9, clue: 'Expression of surprise', cells: [{ row: 1, col: 4 }, { row: 3, col: 4 }] },
          { number: 10, clue: 'Consumed', cells: [{ row: 2, col: 1 }, { row: 3, col: 1 }] },
          { number: 11, clue: 'Electrical unit', cells: [{ row: 2, col: 3 }, { row: 3, col: 3 }] },
          { number: 14, clue: 'Not old', cells: [{ row: 3, col: 2 }, { row: 4, col: 2 }] },
          { number: 15, clue: 'Article', cells: [{ row: 3, col: 3 }, { row: 4, col: 3 }] },
        ],
      },
      answers: {
        across: {
          1: 'ONE',
          3: 'MAN',
          5: 'FRIEND',
          12: 'NEARBY',
          17: 'NO',
          19: 'CANE',
        },
        down: {
          1: 'UM',
          2: 'ON',
          6: 'SAP',
          7: 'HE',
          8: 'NE',
          9: 'AH',
          10: 'ATE',
          11: 'AN',
          14: 'NEW',
          15: 'AN',
        },
      },
    },
    {
      // Crossword 4
      grid: [
        [{ letter: '', number: 1 }, { black: true }, { letter: '', number: 2 }, { letter: '', number: 3 }, { letter: '', number: 4 }],
        [{ letter: '', number: 5 }, { black: true }, { letter: '', number: 6 }, { black: true }, { letter: '', number: 7 }],
        [{ letter: '', number: 8 }, { letter: '', number: 9 }, { letter: '', number: 10 }, { letter: '', number: 11 }, { letter: '', number: 12 }],
        [{ letter: '', number: 13 }, { black: true }, { letter: '', number: 14 }, { black: true }, { letter: '', number: 15 }],
        [{ letter: '', number: 16 }, { black: true }, { letter: '', number: 17 }, { letter: '', number: 18 }, { letter: '', number: 19 }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'Consume food', cells: [{ row: 0, col: 0 }] },
          { number: 2, clue: 'Short sleep', cells: [{ row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }] },
          { number: 5, clue: 'Negative reply', cells: [{ row: 1, col: 0 }] },
          { number: 6, clue: 'Animal doctor', cells: [{ row: 1, col: 2 }] },
          { number: 7, clue: 'Blood carrier', cells: [{ row: 1, col: 4 }] },
          { number: 8, clue: 'Period of history', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }] },
          { number: 13, clue: 'Harmful substance', cells: [{ row: 3, col: 0 }] },
          { number: 14, clue: 'Corded fabric', cells: [{ row: 3, col: 2 }] },
          { number: 15, clue: 'Device for flying', cells: [{ row: 3, col: 4 }] },
          { number: 16, clue: 'Anxious', cells: [{ row: 4, col: 0 }] },
          { number: 17, clue: 'A color', cells: [{ row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 }] },
        ],
        down: [
          { number: 1, clue: 'Consume food', cells: [{ row: 0, col: 0 }, { row: 1, col: 0 }] },
          { number: 2, clue: 'Noisy insect', cells: [{ row: 0, col: 2 }, { row: 1, col: 2 }] },
          { number: 3, clue: 'Pause', cells: [{ row: 0, col: 3 }, { row: 2, col: 3 }, { row: 4, col: 3 }] },
          { number: 4, clue: 'Chicken sound', cells: [{ row: 0, col: 4 }, { row: 1, col: 4 }] },
          { number: 8, clue: 'Period of history', cells: [{ row: 2, col: 0 }, { row: 3, col: 0 }, { row: 4, col: 0 }] },
          { number: 9, clue: 'Small particle', cells: [{ row: 2, col: 1 }, { row: 4, col: 1 }] },
          { number: 10, clue: 'Exist', cells: [{ row: 2, col: 2 }, { row: 3, col: 2 }, { row: 4, col: 2 }] },
          { number: 11, clue: 'Frozen rain', cells: [{ row: 2, col: 3 }] },
          { number: 12, clue: 'Perceive with eyes', cells: [{ row: 2, col: 4 }, { row: 4, col: 4 }] },
        ],
      },
      answers: {
        across: {
          1: 'EAT',
          2: 'NAP',
          5: 'NO',
          6: 'VET',
          7: 'VEIN',
          8: 'ERA',
          13: 'POISON',
          14: 'CORD',
          15: 'PLANE',
          16: 'TENSE',
          17: 'RED',
        },
        down: {
          1: 'EN',
          2: 'ANT',
          3: 'PAUSE',
          4: 'NE',
          8: 'ERA',
          9: 'RA',
          10: 'ARE',
          11: 'ICE',
          12: 'SEE',
        },
      },
    },
    {
      // Crossword 5
      grid: [
        [{ letter: '', number: 1 }, { letter: '', number: 2 }, { black: true }, { letter: '', number: 3 }, { letter: '', number: 4 }],
        [{ letter: '', number: 5 }, { black: true }, { letter: '', number: 6 }, { black: true }, { letter: '', number: 7 }],
        [{ letter: '', number: 8 }, { letter: '', number: 9 }, { letter: '', number: 10 }, { letter: '', number: 11 }, { letter: '', number: 12 }],
        [{ letter: '', number: 13 }, { black: true }, { letter: '', number: 14 }, { black: true }, { letter: '', number: 15 }],
        [{ letter: '', number: 16 }, { letter: '', number: 17 }, { black: true }, { letter: '', number: 18 }, { letter: '', number: 19 }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'Frozen water', cells: [{ row: 0, col: 0 }, { row: 0, col: 1 }] },
          { number: 3, clue: 'Not down', cells: [{ row: 0, col: 3 }, { row: 0, col: 4 }] },
          { number: 5, clue: 'Zero', cells: [{ row: 1, col: 0 }] },
          { number: 6, clue: 'Writing instrument', cells: [{ row: 1, col: 2 }] },
          { number: 7, clue: 'Consume', cells: [{ row: 1, col: 4 }] },
          { number: 8, clue: 'Mature', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }] },
          { number: 13, clue: 'Not me', cells: [{ row: 3, col: 0 }] },
          { number: 14, clue: 'Loud noise', cells: [{ row: 3, col: 2 }] },
          { number: 15, clue: 'Central part', cells: [{ row: 3, col: 4 }] },
          { number: 16, clue: 'Article', cells: [{ row: 4, col: 0 }] },
          { number: 17, clue: 'Exist', cells: [{ row: 4, col: 1 }] },
          { number: 18, clue: 'Over there', cells: [{ row: 4, col: 3 }, { row: 4, col: 4 }] },
        ],
        down: [
          { number: 1, clue: 'Frozen water', cells: [{ row: 0, col: 0 }, { row: 1, col: 0 }] },
          { number: 2, clue: 'Close by', cells: [{ row: 0, col: 1 }, { row: 2, col: 1 }, { row: 4, col: 1 }] },
          { number: 3, clue: 'Not down', cells: [{ row: 0, col: 3 }, { row: 1, col: 3 }] },
          { number: 4, clue: 'Number after three', cells: [{ row: 0, col: 4 }, { row: 1, col: 4 }] },
          { number: 6, clue: 'Writing instrument', cells: [{ row: 1, col: 2 }, { row: 2, col: 2 }] },
          { number: 8, clue: 'Mature', cells: [{ row: 2, col: 0 }, { row: 3, col: 0 }, { row: 4, col: 0 }] },
          { number: 10, clue: 'Third person singular', cells: [{ row: 2, col: 2 }, { row: 3, col: 2 }] },
          { number: 11, clue: 'Conjunction', cells: [{ row: 2, col: 3 }, { row: 4, col: 3 }] },
          { number: 12, clue: 'Letter after A', cells: [{ row: 2, col: 4 }, { row: 3, col: 4 }] },
        ],
      },
      answers: {
        across: {
          1: 'ICE',
          3: 'UP',
          5: 'O',
          6: 'PEN',
          7: 'EAT',
          8: 'OLD',
          13: 'NOT',
          14: 'BOOM',
          15: 'CORE',
          16: 'A',
          17: 'BE',
          18: 'THERE',
        },
        down: {
          1: 'IN',
          2: 'CAT',
          3: 'UP',
          4: 'FIVE',
          6: 'PEN',
          8: 'ONE',
          10: 'HE',
          11: 'OR',
          12: 'B',
        },
      },
    },
  ];
  
  // Function to get today's crossword index
function getTodayCrosswordIndex() {
    const currentDate = new Date();
    const startDate = new Date(2020, 0, 1); // Start date: January 1, 2020
    const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  
    const crosswordIndex = daysSinceStart % crosswords.length;
    return crosswordIndex;
  }
  
  // Get today's crossword
const todayCrosswordIndex = getTodayCrosswordIndex();
const crossword = crosswords[todayCrosswordIndex];
  

  
// Generate the crossword grid
const gridElement = document.getElementById('crossword-grid');
gridElement.innerHTML = ''; // Clear existing content

if (crossword && crossword.grid) {
  const numRows = crossword.grid.length;
  const numCols = crossword.grid[0].length; // Ensure all rows have the same length

  // Adjust grid CSS based on actual grid size
  gridElement.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

  crossword.grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.row = rowIndex;
      cellElement.dataset.col = cellIndex;

      if (cell.black) {
        cellElement.classList.add('black-cell');
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.row = rowIndex;
        input.dataset.col = cellIndex;
        input.autocomplete = 'off';

        cellElement.appendChild(input);

        if (cell.number) {
          const cellNumber = document.createElement('div');
          cellNumber.classList.add('cell-number');
          cellNumber.textContent = cell.number;
          cellElement.appendChild(cellNumber);
        }
      }
      gridElement.appendChild(cellElement);
    });
  });
}
  // Populate clues
  function populateClues() {
    // Populate across clues
    const acrossCluesElement = document.getElementById('across-clues');
    acrossCluesElement.innerHTML = '';
  
    if (crossword && crossword.clues && crossword.clues.across) {
      crossword.clues.across.forEach((clue) => {
        const clueItem = document.createElement('li');
        clueItem.textContent = `${clue.number}. ${clue.clue}`;
        clueItem.dataset.clueNumber = `across-${clue.number}`;
        clueItem.addEventListener('click', () => focusFirstCell(clue.cells));
        acrossCluesElement.appendChild(clueItem);
      });
    }
  
    // Populate down clues
    const downCluesElement = document.getElementById('down-clues');
    downCluesElement.innerHTML = '';
  
    if (crossword && crossword.clues && crossword.clues.down) {
      crossword.clues.down.forEach((clue) => {
        const clueItem = document.createElement('li');
        clueItem.textContent = `${clue.number}. ${clue.clue}`;
        clueItem.dataset.clueNumber = `down-${clue.number}`;
        clueItem.addEventListener('click', () => focusFirstCell(clue.cells));
        downCluesElement.appendChild(clueItem);
      });
    }
  }
  
  populateClues();
  
  // Highlighting functions
  function highlightCell(row, col) {
    // Remove highlight from all cells
    document.querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('highlighted');
    });
  
    // Add highlight to the focused cell
    const cellElement = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    if (cellElement) {
      cellElement.classList.add('highlighted');
    }
  }
  
  function highlightCluesForCell(row, col) {
    // Remove highlight from all clues
    document.querySelectorAll('.clues-section li').forEach(clue => {
      clue.classList.remove('highlighted');
    });
  
    // Find the clues that correspond to this cell
    const clues = findCluesForCell(row, col);
  
    // Highlight those clues
    clues.forEach(clueNumber => {
      document.querySelectorAll(`.clues-section li[data-clue-number='${clueNumber}']`).forEach(clueItem => {
        clueItem.classList.add('highlighted');
      });
    });
  }
  
  function findCluesForCell(row, col) {
    const clueNumbers = [];
  
    // Check across clues
    crossword.clues.across.forEach(clue => {
      if (clue.cells && clue.cells.some(cell => cell.row === row && cell.col === col)) {
        clueNumbers.push(`across-${clue.number}`);
      }
    });
  
    // Check down clues
    crossword.clues.down.forEach(clue => {
      if (clue.cells && clue.cells.some(cell => cell.row === row && cell.col === col)) {
        clueNumbers.push(`down-${clue.number}`);
      }
    });
  
    return clueNumbers;
  }
  
  // Focus the first cell of a clue when the clue is clicked
  function focusFirstCell(cells) {
    if (cells && cells.length > 0) {
      const firstCell = cells[0];
      const input = document.querySelector(`input[data-row='${firstCell.row}'][data-col='${firstCell.col}']`);
      if (input) {
        input.focus();
      }
    }
  }
  
  // Auto-advance input focus and keyboard navigation
  gridElement.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
      const value = e.target.value.toUpperCase();
      e.target.value = value;
  
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
  
      // Move focus to the next cell in the current word
      moveToNextCell(row, col);
    }
  });
  
  gridElement.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'INPUT') {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
  
      // Highlight the cell
      highlightCell(row, col);
  
      // Highlight corresponding clues
      highlightCluesForCell(row, col);
  
      // Set current direction based on which clue is highlighted
      const clues = findCluesForCell(row, col);
  
      if (clues.length > 0) {
        if (clues[0].startsWith('across')) {
          currentDirection = 'across';
        } else {
          currentDirection = 'down';
        }
      }
    }
  });
  
  // Keyboard navigation using arrow keys
  gridElement.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
  
      let newRow = row;
      let newCol = col;
  
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newRow = row - 1;
          break;
        case 'ArrowDown':
          e.preventDefault();
          newRow = row + 1;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newCol = col - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          newCol = col + 1;
          break;
        case 'Backspace':
          if (e.target.value === '') {
            moveToPreviousCell(row, col);
          }
          break;
        default:
          break;
      }
  
      const nextInput = document.querySelector(`input[data-row='${newRow}'][data-col='${newCol}']`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
  
  // Auto-advance to next cell
  let currentDirection = 'across'; // Default direction
  
  function moveToNextCell(row, col) {
    let nextCell = findNextCell(row, col, currentDirection);
  
    if (!nextCell) {
      // Switch direction if no next cell
      currentDirection = currentDirection === 'across' ? 'down' : 'across';
      nextCell = findNextCell(row, col, currentDirection);
    }
  
    if (nextCell) {
      const nextInput = document.querySelector(`input[data-row='${nextCell.row}'][data-col='${nextCell.col}']`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  
  function moveToPreviousCell(row, col) {
    let prevCell = findPreviousCell(row, col, currentDirection);
  
    if (!prevCell) {
      // Switch direction if no previous cell
      currentDirection = currentDirection === 'across' ? 'down' : 'across';
      prevCell = findPreviousCell(row, col, currentDirection);
    }
  
    if (prevCell) {
      const prevInput = document.querySelector(`input[data-row='${prevCell.row}'][data-col='${prevCell.col}']`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  }
  
  function findNextCell(row, col, direction) {
    let nextCell = null;
    const clueNumbers = findCluesForCell(row, col);
  
    // Find the current clue based on the direction
    const clueNumber = clueNumbers.find(cn => cn.startsWith(direction));
    if (clueNumber) {
      const clue = crossword.clues[direction].find(clue => `${direction}-${clue.number}` === clueNumber);
  
      if (clue) {
        // Find the index of the current cell in the clue's cells
        const index = clue.cells.findIndex(cell => cell.row === row && cell.col === col);
        if (index !== -1 && index < clue.cells.length - 1) {
          // Return the next cell in the clue
          nextCell = clue.cells[index + 1];
        }
      }
    }
  
    return nextCell;
  }
  
  function findPreviousCell(row, col, direction) {
    let prevCell = null;
    const clueNumbers = findCluesForCell(row, col);
  
    // Find the current clue based on the direction
    const clueNumber = clueNumbers.find(cn => cn.startsWith(direction));
    if (clueNumber) {
      const clue = crossword.clues[direction].find(clue => `${direction}-${clue.number}` === clueNumber);
  
      if (clue) {
        // Find the index of the current cell in the clue's cells
        const index = clue.cells.findIndex(cell => cell.row === row && cell.col === col);
        if (index > 0) {
          // Return the previous cell in the clue
          prevCell = clue.cells[index - 1];
        }
      }
    }
  
    return prevCell;
  }
  
  // Function to check answers
  function checkAnswers() {
    let allCorrect = true;
  
    // Check across answers
    crossword.clues.across.forEach((clue) => {
      const answer = crossword.answers.across[clue.number];
      const cells = clue.cells.map(({ row, col }) => {
        return document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
      });
      const userAnswer = cells.map(cell => cell.value.toUpperCase() || ' ').join('');
  
      if (userAnswer !== answer) {
        allCorrect = false;
        // Optionally, highlight incorrect cells
        cells.forEach(cell => {
          cell.classList.add('incorrect');
        });
      } else {
        // Remove incorrect highlight if the answer is now correct
        cells.forEach(cell => {
          cell.classList.remove('incorrect');
        });
      }
    });
  
    // Check down answers
    crossword.clues.down.forEach((clue) => {
      const answer = crossword.answers.down[clue.number];
      const cells = clue.cells.map(({ row, col }) => {
        return document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
      });
      const userAnswer = cells.map(cell => cell.value.toUpperCase() || ' ').join('');
  
      if (userAnswer !== answer) {
        allCorrect = false;
        // Optionally, highlight incorrect cells
        cells.forEach(cell => {
          cell.classList.add('incorrect');
        });
      } else {
        // Remove incorrect highlight if the answer is now correct
        cells.forEach(cell => {
          cell.classList.remove('incorrect');
        });
      }
    });
  
    if (allCorrect) {
      alert('Congratulations! You solved today\'s crossword.');
      playSuccessJingle();
      clearInterval(timerInterval); // Stop the timer
    } else {
      alert('Some answers are incorrect. Keep trying!');
    }
  }
  
  // Event listeners for action buttons
  document.getElementById('check-button').addEventListener('click', checkAnswers);
  document.getElementById('reveal-button').addEventListener('click', revealAnswers);
  document.getElementById('restart-button').addEventListener('click', restartPuzzle);
  
  function revealAnswers() {
    // Reveal all answers
    // Across answers
    crossword.clues.across.forEach((clue) => {
      const answer = crossword.answers.across[clue.number];
      const cells = clue.cells.map(({ row, col }) => {
        return document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
      });
  
      answer.split('').forEach((letter, index) => {
        if (cells[index]) {
          cells[index].value = letter;
        }
      });
    });
  
    // Down answers
    crossword.clues.down.forEach((clue) => {
      const answer = crossword.answers.down[clue.number];
      const cells = clue.cells.map(({ row, col }) => {
        return document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
      });
  
      answer.split('').forEach((letter, index) => {
        if (cells[index]) {
          cells[index].value = letter;
        }
      });
    });
  
    clearInterval(timerInterval); // Stop the timer
  }
  
  function restartPuzzle() {
    // Clear all inputs
    const inputs = document.querySelectorAll('#crossword-grid input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('incorrect');
    });
  
    // Reset timer
    clearInterval(timerInterval);
    startTime = Date.now();
    startTimer();
  }
  
  // Timer functionality
  let startTime = Date.now();
  let timerInterval;
  
  function startTimer() {
    updateTimer(); // Update immediately
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
  
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  function playSuccessJingle() {
    successAudio.currentTime = 0; // Reset audio to the beginning
    successAudio.play();
  }
  // Start the timer when the page loads
  window.addEventListener('load', () => {
    startTimer();
  });
  
  // Additional styling for incorrect cells
  const style = document.createElement('style');
  style.innerHTML = `
    .cell input.incorrect {
      background-color: #f8d7da;
    }
  `;
  document.head.appendChild(style);