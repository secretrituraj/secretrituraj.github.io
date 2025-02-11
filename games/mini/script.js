// script.js

// Define an array of crosswords (for simplicity, only two crosswords are defined here)
// You can add more crosswords to the array to have a total of five.
const successAudio = document.getElementById('success-audio'); // If you have this

// script.js

const crosswords = [
    {
      // Crossword 1
      grid: [
        [{ black: true }, { letter: '', number: 1 }, { letter: '', number: 2 }, { letter: '', number: 3 },  { letter: '', number: 4 }],
        [{ black: true }, { letter: '', number: 5 }, { letter: '', number: 6 }, { letter: '', number: 7 }, { letter: '', number: 8 }],
        [{ letter: '', number: 9 }, { letter: '', number: 10 },  { letter: '', number: 11 }, { letter: '', number: 12 }, { letter: '', number: 13 }],
        [{ black: true }, { letter: '', number: 14 }, { letter: '', number: 15 },  { letter: '', number: 16 }, { black: true }],
        [{ black: true }, { black: true }, { black: true }, { letter: '', number: 17 }, { letter: '', number: 18 }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'Slang for self pleasure', cells: [{ row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }] },
          { number: 5, clue: 'Proud _ (song)', cells: [{ row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }] },
          { number: 9, clue: '_ Diem', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }] },
          { number: 14, clue: 'American airport security or Oxford entrance exam', cells: [{ row: 3, col: 1 }, { row: 3, col: 2}, { row: 3, col: 3}] },
          { number: 17, clue: 'What my mum used to work in', cells: [{ row: 4, col: 3 }, { row: 4, col: 4 }] },
        ],
        down: [
          { number: 1, clue: 'ENI____IC ????(mysterious)', cells: [{ row: 0, col: 1 }, { row: 1 , col: 1 }, { row: 2, col: 1 },  { row: 3, col: 1 }] },
          { number: 2, clue: 'What a cox directs', cells: [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 },  { row: 3, col: 2}] },
          { number: 3, clue: "Oprah's real name", cells: [{ row: 0, col: 3 }, { row: 1, col: 3 }, { row: 2, col: 3 }, { row: 3, col: 3}, { row: 4, col: 3},] },
          { number: 4, clue: "The day we wasted £50 on Simmons' Bar", cells: [{ row: 0, col: 4 }, { row: 1, col: 4}, { row: 2, col: 4}] },
          { number: 9, clue: '__ u l8r', cells: [{ row: 2, col: 0 }] },
          { number: 18, clue: '_eel badman ', cells: [{ row: 4, col: 4 }] },
        ],
      },
      answers: {
        across: {
          1: 'GOON',
          5: 'MARY',
          9: 'CARPE',
          14: 'TSA',
          17: 'HR',
        },
        down: {
          1: 'GMAT',
          2: 'OARS',
          3: 'ORPAH',
          4: 'NYE',
          9: 'C',
          18: 'R',
        },
      },
    },
    {
      // Crossword 1
      grid: [
        [{ black: true }, { letter: '', number: 1 }, { letter: '', number: 2 }, { letter: '', number: 3 },  { letter: '', number: 4 }],
        [{ black: true }, { letter: '', number: 5 }, { letter: '', number: 6 }, { letter: '', number: 7 }, { letter: '', number: 8 }],
        [{ letter: '', number: 9 }, { letter: '', number: 10 },  { letter: '', number: 11 }, { letter: '', number: 12 }, { letter: '', number: 13 }],
        [{ black: true }, { letter: '', number: 14 }, { letter: '', number: 15 },  { letter: '', number: 16 }, { black: true }],
        [{ black: true }, { black: true }, { black: true }, { letter: '', number: 17 }, { letter: '', number: 18 }],
      ],
      clues: {
        across: [
          { number: 1, clue: 'Slang for self pleasure', cells: [{ row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }] },
          { number: 5, clue: 'Proud _ (song)', cells: [{ row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }] },
          { number: 9, clue: '_ Diem', cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }] },
          { number: 14, clue: 'American airport security or Oxford entrance exam', cells: [{ row: 3, col: 1 }, { row: 3, col: 2}, { row: 3, col: 3}] },
          { number: 17, clue: 'What my mum used to work in', cells: [{ row: 4, col: 3 }, { row: 4, col: 4 }] },
        ],
        down: [
          { number: 1, clue: 'ENI____IC ????(mysterious)', cells: [{ row: 0, col: 1 }, { row: 1 , col: 1 }, { row: 2, col: 1 },  { row: 3, col: 1 }] },
          { number: 2, clue: 'What a cox directs', cells: [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 },  { row: 3, col: 2}] },
          { number: 3, clue: "Oprah's real name", cells: [{ row: 0, col: 3 }, { row: 1, col: 3 }, { row: 2, col: 3 }, { row: 3, col: 3}, { row: 4, col: 3},] },
          { number: 4, clue: "The day we wasted £50 on Simmons' Bar", cells: [{ row: 0, col: 4 }, { row: 1, col: 4}, { row: 2, col: 4}] },
          { number: 9, clue: '__ u l8r', cells: [{ row: 2, col: 0 }] },
          { number: 18, clue: '_eel badman ', cells: [{ row: 4, col: 4 }] },
        ],
      },
      answers: {
        across: {
          1: 'GOON',
          5: 'MARY',
          9: 'CARPE',
          14: 'TSA',
          17: 'HR',
        },
        down: {
          1: 'GMAT',
          2: 'OARS',
          3: 'ORPAH',
          4: 'NYE',
          9: 'C',
          18: 'R',
        },
      },
    }
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
//const crossword = crosswords[todayCrosswordIndex]; (this would be the code but i'm testing with just one crossword)
const crossword = crosswords[0]
  

  
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
  
  gridElement.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
      const value = e.target.value.toUpperCase();
      e.target.value = value;
  
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
  
      // Move focus to the next cell in the current word
      moveToNextCell(row, col);
  
      // Check if the crossword is completed and correct
      autoCheckCompletion();
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
  
  function autoCheckCompletion() {
    // Check if all inputs are filled
    const inputs = document.querySelectorAll('#crossword-grid input');
    let allFilled = true;
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
      }
    });
  
    if (allFilled) {
      // All cells are filled, now check if the answers are correct
      const allCorrect = checkAnswers(true); // Silent checking
  
      if (allCorrect) {
        // Puzzle is completed and correct
        handleSuccess(); // Stop the timer
      }
    }
  }

  function checkAnswers(isAutoCheck = false) {
    let allCorrect = true;

    // Map to keep track of cell correctness: key is 'row-col', value is true (correct) or false (incorrect)
    let cellStatus = {};

    // Initialize cellStatus with true for all cells
    document.querySelectorAll('.cell input').forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const key = `${row}-${col}`;
        cellStatus[key] = true; // Assume correct initially
    });

    // Function to mark a cell as incorrect
    function markCellIncorrect(cell) {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const key = `${row}-${col}`;
        cellStatus[key] = false; // Mark as incorrect
    }

    // Check across answers
    crossword.clues.across.forEach((clue) => {
        const answer = crossword.answers.across[clue.number];
        const cells = clue.cells.map(({ row, col }) => {
            return document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
        });

        answer.split('').forEach((correctLetter, index) => {
            const cell = cells[index];
            const userLetter = (cell.value || ' ').toUpperCase().trim();

            if (userLetter !== correctLetter) {
                allCorrect = false;
                markCellIncorrect(cell);
            }
            // We don't unmark cells here because they might be incorrect in another clue
        });
    });

    // Check down answers
    crossword.clues.down.forEach((clue) => {
        const answer = crossword.answers.down[clue.number];
        const cells = clue.cells.map(({ row, col }) => {
            return document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
        });

        answer.split('').forEach((correctLetter, index) => {
            const cell = cells[index];
            const userLetter = (cell.value || ' ').toUpperCase().trim();

            if (userLetter !== correctLetter) {
                allCorrect = false;
                markCellIncorrect(cell);
            }
            // We don't unmark cells here because they might be incorrect in another clue
        });
    });

    // Now update the class based on cellStatus
    document.querySelectorAll('.cell input').forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        const key = `${row}-${col}`;

        if (cellStatus[key]) {
            // Cell is correct
            cell.classList.remove('incorrect');
        } else {
            // Cell is incorrect
            cell.classList.add('incorrect');
        }
    });

    // When called from the 'Check' button, display messages
    if (!isAutoCheck) {
        if (allCorrect) {
          handleSuccess(); // Stop the timer
        } else {
            alert('Some answers are incorrect. Keep trying!');
        }
    }

    return allCorrect;
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
  
  let startTime = Date.now();
  let timerInterval;
  let elapsedTime = 0; // in seconds
  
  function startTimer() {
    updateTimer(); // Update immediately
    timerInterval = setInterval(updateTimer, 1000);
  }
  
  function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
  
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
  }
  function playSuccessJingle() {
    successAudio.currentTime = 0; // Reset audio to the beginning
    successAudio.play();
  }
  function handleSuccess() {
    const timeMessage = formatTime(elapsedTime);
    alert(`Congratulations! You solved today's crossword in ${timeMessage}.`);
    playSuccessJingle();
    clearInterval(timerInterval); // Stop the timer
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