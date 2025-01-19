// Access elements
const wordGrid = document.getElementById('word-grid');
const foundGroupsContainer = document.getElementById('found-groups');
const feedback = document.getElementById('feedback');
const resetButton = document.getElementById('reset-button');
const shuffleButton = document.getElementById('shuffle-button');
const deselectButton = document.getElementById('deselect-button');
const submitButton = document.getElementById('submit-button');
const mistakesRemainingContainer = document.getElementById('mistakes-remaining');
const successAudio = document.getElementById('success-audio'); // Added

let selectedWords = [];
let remainingMistakes = 4;
let foundGroups = 0;
let gameCompleted = false;

// Get today's puzzle
const puzzle = getPuzzleOfTheDay();

// Clone the words array to manipulate
let wordsArray = [];

// Initialize the game
function initGame() {
  // Attempt to load saved game state
  const savedState = loadGameState();

  if (savedState) {
    // Load saved state
    selectedWords = [];
    remainingMistakes = savedState.remainingMistakes;
    foundGroups = savedState.foundGroups;
    gameCompleted = savedState.gameCompleted;
    wordsArray = savedState.wordsArray;
    feedback.innerHTML = savedState.feedback;
  } else {
    // Start new game
    selectedWords = [];
    remainingMistakes = 4;
    foundGroups = 0;
    gameCompleted = false;
    feedback.textContent = '';
    wordsArray = [...puzzle.words];
    wordsArray.forEach(word => word.found = false);
    wordsArray.sort(() => 0.5 - Math.random());
  }

  // Clear containers
  wordGrid.innerHTML = '';
  foundGroupsContainer.innerHTML = '';
  updateMistakesDisplay();
  updateSubmitButtonState();

  // Create word tiles
  wordsArray.forEach((word) => {
    const tile = document.createElement('div');
    tile.classList.add('word-tile');
    tile.textContent = word.text;
    tile.dataset.word = word.text;

    if (word.found) {
      // If word is part of a found group, display it in the found groups
      tile.removeEventListener('click', selectWordHandler);
    } else {
      tile.addEventListener('click', selectWordHandler);
    }

    if (word.found) {
      // Add to found groups
      addToFoundGroups(word, tile, false);
    } else {
      // Add to word grid
      wordGrid.appendChild(tile);
    }
  });

  if (gameCompleted) {
    disableAllTiles();
    resetButton.disabled = true; // Disable reset button if game is completed
  }
}

function selectWordHandler(e) {
  const tile = e.currentTarget;
  const wordText = tile.dataset.word;
  const word = wordsArray.find(w => w.text === wordText);
  selectWord(tile, word);
}

function selectWord(tile, word) {
  // Ignore if word is already part of a found group
  if (word.found) return;

  if (selectedWords.includes(word)) {
    // Deselect word
    selectedWords = selectedWords.filter(w => w !== word);
    tile.classList.remove('selected');
  } else {
    // Prevent selecting more than 4 tiles
    if (selectedWords.length >= 4) {
      return;
    }
    // Select word
    selectedWords.push(word);
    tile.classList.add('selected');
  }

  // Update submit button state
  updateSubmitButtonState();

  // Save game state
  saveGameState();
}

function updateSubmitButtonState() {
  if (selectedWords.length === 4) {
    submitButton.disabled = false;
    submitButton.classList.add('active'); // Add the 'active' class
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('active'); // Remove the 'active' class
  }
}

function checkGroup() {
  const groupIds = selectedWords.map(word => word.groupId);
  const allSameGroup = groupIds.every(id => id === groupIds[0]);

  if (allSameGroup) {
    // Correct group
    const groupId = groupIds[0];

    selectedWords.forEach(word => {
      word.found = true;
    });

    // Move found group to the top
    addGroupToFoundGroups(groupId);

    foundGroups++;

    if (foundGroups === 4) {
      // Game completed
      disableAllTiles();
      resetButton.disabled = true;
      gameCompleted = true;
      clearGameState();
      saveCompletionState();

      // Play success jingle
      playSuccessJingle();

      return;
    }
  } else {
    // Incorrect group
    remainingMistakes--;
    updateMistakesDisplay();
    // Shake animation
    selectedWords.forEach(word => {
      const tile = getTileByWord(word.text);
      tile.classList.add('incorrect');
      setTimeout(() => tile.classList.remove('incorrect'), 500);
      tile.classList.remove('selected');
    });
    if (remainingMistakes === 0) {
      feedback.textContent = 'Game Over. The correct groups were:';
      showCorrectGroups();
      disableAllTiles();
      resetButton.disabled = true;
      gameCompleted = true;
      clearGameState();
      saveCompletionState();
      return;
    }
  }
  // Reset selection
  selectedWords = [];
  updateSubmitButtonState();
  // Save game state
  saveGameState();
}

function getTileByWord(wordText) {
  return [...document.querySelectorAll('.word-tile')].find(tile => tile.dataset.word === wordText);
}

function disableAllTiles() {
  document.querySelectorAll('.word-tile').forEach(tile => {
    tile.removeEventListener('click', selectWordHandler);
    tile.classList.remove('selected');
  });
}

function resetGame() {
  if (gameCompleted) {
    return; // Prevent resetting if game is completed
  }

  clearGameState();
  initGame();
}

function shuffleWords() {
  if (gameCompleted) {
    return; // Do not shuffle if game is completed
  }
  // Shuffle the unguessed words
  const unguessedWords = wordsArray.filter(word => !word.found);
  unguessedWords.sort(() => 0.5 - Math.random());

  // Clear the word grid
  wordGrid.innerHTML = '';

  // Re-render the unguessed words
  unguessedWords.forEach((word) => {
    const tile = document.createElement('div');
    tile.classList.add('word-tile');
    tile.textContent = word.text;
    tile.dataset.word = word.text;
    tile.addEventListener('click', selectWordHandler);
    wordGrid.appendChild(tile);
  });

  // Save game state
  saveGameState();
}

function deselectAll() {
  // Deselect all currently selected words
  selectedWords.forEach(word => {
    const tile = getTileByWord(word.text);
    tile.classList.remove('selected');
  });
  selectedWords = [];
  updateSubmitButtonState();
  // Save game state
  saveGameState();
}

// Event listeners
resetButton.addEventListener('click', resetGame);
shuffleButton.addEventListener('click', shuffleWords);
deselectButton.addEventListener('click', deselectAll);
submitButton.addEventListener('click', () => {
  if (selectedWords.length === 4) {
    checkGroup();
  }
});

// Functions to handle multiple puzzles
function getPuzzleOfTheDay() {
  const startDate = new Date(2023, 0, 1); // Start date (e.g., January 1, 2023)
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const index = diffDays % puzzles.length;
  return puzzles[index];
}

// Add group to found groups container
function addGroupToFoundGroups(groupId) {
  const groupWords = wordsArray.filter(word => word.groupId === groupId);
  const groupTitle = document.createElement('div');
  groupTitle.classList.add('group-title');
  groupTitle.textContent = puzzle.themes[groupId];

  const groupBlock = document.createElement('div');
  groupBlock.classList.add('group-block');
  groupBlock.classList.add(`group-color-${groupId}`); // Assign group color

  groupTitle.classList.add(`group-color-${groupId}`); // Assign group color to title

  groupWords.forEach(word => {
    const tile = getTileByWord(word.text);
    tile.classList.remove('selected');
    tile.classList.add(`group-color-${groupId}`);
    tile.removeEventListener('click', selectWordHandler);
    // Remove from word grid
    wordGrid.removeChild(tile);
    // Add to group block
    groupBlock.appendChild(tile);
  });

  // Append group to found groups container
  foundGroupsContainer.appendChild(groupTitle);
  foundGroupsContainer.appendChild(groupBlock);
}

// Show correct groups on game over
function showCorrectGroups() {
  for (let groupId in puzzle.themes) {
    if (!wordsArray.some(word => word.groupId === parseInt(groupId) && !word.found)) {
      // Group already found
      continue;
    }
    addGroupToFoundGroups(groupId);
  }
}

// Update Mistakes Remaining Display
function updateMistakesDisplay() {
  mistakesRemainingContainer.innerHTML = '';
  for (let i = 0; i < remainingMistakes; i++) {
    const circle = document.createElement('div');
    circle.classList.add('mistake-circle');
    mistakesRemainingContainer.appendChild(circle);
  }
}

// Play success jingle
function playSuccessJingle() {
  successAudio.currentTime = 0; // Reset to start
  successAudio.play();
}

// Local Storage Functions
function saveGameState() {
  const gameState = {
    remainingMistakes: remainingMistakes,
    foundGroups: foundGroups,
    gameCompleted: gameCompleted,
    wordsArray: wordsArray,
    feedback: feedback.innerHTML
  };
  localStorage.setItem(`connectionsGameState_${getPuzzleKey()}`, JSON.stringify(gameState));
}

function loadGameState() {
  const savedState = JSON.parse(localStorage.getItem(`connectionsGameState_${getPuzzleKey()}`));
  if (savedState && isSamePuzzle(savedState.wordsArray)) {
    return savedState;
  } else {
    // Clear any old game state if puzzle has changed
    clearGameState();
    return null;
  }
}

function clearGameState() {
  localStorage.removeItem(`connectionsGameState_${getPuzzleKey()}`);
}

function saveCompletionState() {
  // Store a flag in localStorage to indicate the puzzle has been completed
  localStorage.setItem(`connectionsGameCompleted_${getPuzzleKey()}`, 'true');
}

function isPuzzleCompleted() {
  return localStorage.getItem(`connectionsGameCompleted_${getPuzzleKey()}`) === 'true';
}

function isSamePuzzle(savedWordsArray) {
  // Check if saved puzzle matches today's puzzle
  const savedWords = savedWordsArray.map(word => word.text).sort();
  const todayWords = puzzle.words.map(word => word.text).sort();
  return JSON.stringify(savedWords) === JSON.stringify(todayWords);
}

function getPuzzleKey() {
  // Generate a unique key for today's puzzle
  const startDate = new Date(2023, 0, 1);
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const index = diffDays % puzzles.length;
  return `puzzle_${index}`;
}

// Initialize the game when the page loads
if (isPuzzleCompleted()) {
  // If the puzzle is completed, show the completed state
  gameCompleted = true;
  initGame();
  disableAllTiles();
  resetButton.disabled = true;
} else {
  initGame();
}