// Access elements
const wordGrid = document.getElementById('word-grid');
const foundGroupsContainer = document.getElementById('found-groups');
const feedback = document.getElementById('feedback');
const resetButton = document.getElementById('reset-button');
const shuffleButton = document.getElementById('shuffle-button');
const deselectButton = document.getElementById('deselect-button');
const submitButton = document.getElementById('submit-button');
const mistakesRemainingContainer = document.getElementById('mistakes-remaining');
const successAudio = document.getElementById('success-audio'); // If you have this

// Reference the notification container
const notificationContainer = document.getElementById('notification-container');

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
      // Word was already found
    } else {
      tile.addEventListener('click', selectWordHandler);
    }

    if (word.found) {
      // Add to found groups
      addGroupToFoundGroups(word.groupId);
    } else if (!gameCompleted) {
      // Add to word grid (only if game is not completed)
      wordGrid.appendChild(tile);
    }
  });

  if (gameCompleted) {
    disableAllTiles();
    showCorrectGroups(); // Display all groups with words
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
  // Check if any selected words have already been found
  const alreadyFound = selectedWords.some(word => word.found);

  if (alreadyFound) {
    // Display "Already guessed" message
    showTemporaryMessage('Already guessed');
    // Deselect words without deducting a mistake
    selectedWords.forEach(word => {
      const tile = getTileByWord(word.text);
      tile.classList.remove('selected');
    });
    selectedWords = [];
    updateSubmitButtonState();
    return;
  }

  const groupIds = selectedWords.map(word => word.groupId);

  // Check for correct group
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
      // Game Completed
      disableAllTiles();
      gameCompleted = true;
      clearGameState();
      saveCompletionState();

      // Play success jingle if you have one
      playSuccessJingle();

      return;
    }
  } else {
    // Check if the selection is "one away"
    const groupIdCounts = {};
    groupIds.forEach(id => {
      groupIdCounts[id] = (groupIdCounts[id] || 0) + 1;
    });

    // Find the group with the highest count
    const maxGroupId = Object.keys(groupIdCounts).reduce((a, b) => groupIdCounts[a] > groupIdCounts[b] ? a : b);
    const maxCount = groupIdCounts[maxGroupId];

    if (maxCount === 3) {
      // The player has selected 3 words from the same group and 1 from another
      showTemporaryMessage('One away...');
    }

    // Deduct a mistake
    remainingMistakes--;
    updateMistakesDisplay();

    // Shake animation for incorrect selection
    selectedWords.forEach(word => {
      const tile = getTileByWord(word.text);
      tile.classList.add('incorrect');
      setTimeout(() => tile.classList.remove('incorrect'), 500);
      tile.classList.remove('selected');
    });

    if (remainingMistakes === 0) {
      feedback.textContent = '';
      disableAllTiles();
      gameCompleted = true;
      clearGameState();
      saveCompletionState();
      showCorrectGroups(); // Display all groups with words upon failure
      return;
    }

    // Reset selection
    selectedWords = [];
    updateSubmitButtonState();
    // Save game state
    saveGameState();
  }
}

function showTemporaryMessage(message) {
  notificationContainer.textContent = message;
  notificationContainer.classList.add('show');

  setTimeout(() => {
    notificationContainer.classList.remove('show');
    notificationContainer.textContent = ''; // Clear the message
  }, 2000); // Message disappears after 2 seconds
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
  const groupWords = puzzle.words.filter(word => word.groupId === parseInt(groupId));
  const groupTitle = document.createElement('div');
  groupTitle.classList.add('group-title');
  groupTitle.classList.add(`group-color-${groupId}`);
  groupTitle.textContent = puzzle.themes[groupId];

  const groupBlock = document.createElement('div');
  groupBlock.classList.add('group-block');
  groupBlock.classList.add(`group-color-${groupId}`);

  groupWords.forEach(word => {
    const tile = createWordTile(word);
    tile.classList.add(`group-color-${groupId}`);
    groupBlock.appendChild(tile);
  });

  // Append group to found groups container
  foundGroupsContainer.appendChild(groupTitle);
  foundGroupsContainer.appendChild(groupBlock);
}

// Create a word tile
function createWordTile(word) {
  const tile = document.createElement('div');
  tile.classList.add('word-tile');
  tile.textContent = word.text;
  tile.dataset.word = word.text;
  tile.style.color = '#000000'; // Ensure text is black
  return tile;
}

// Show correct groups on game over
function showCorrectGroups() {
  // Clear the word grid
  wordGrid.innerHTML = '';

  // For each group, display the words in the colored box
  for (let groupId in puzzle.themes) {
    const groupWords = puzzle.words.filter(word => word.groupId === parseInt(groupId));

    // Create group title
    const groupTitle = document.createElement('div');
    groupTitle.classList.add('group-title');
    groupTitle.classList.add(`group-color-${groupId}`);
    groupTitle.textContent = puzzle.themes[groupId];

    // Create group block
    const groupBlock = document.createElement('div');
    groupBlock.classList.add('group-block');
    groupBlock.classList.add(`group-color-${groupId}`);

    groupWords.forEach(word => {
      const tile = createWordTile(word);
      tile.classList.add(`group-color-${groupId}`);
      groupBlock.appendChild(tile);
    });

    // Append group to found groups container
    foundGroupsContainer.appendChild(groupTitle);
    foundGroupsContainer.appendChild(groupBlock);
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

// Local Storage Functions
function saveGameState() {
  const gameState = {
    remainingMistakes: remainingMistakes,
    foundGroups: foundGroups,
    gameCompleted: gameCompleted,
    wordsArray: wordsArray,
    feedback: feedback.innerHTML,
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
function playSuccessJingle() {
  successAudio.currentTime = 0; // Reset audio to the beginning
  successAudio.play();
}
// Initialize the game when the page loads
if (isPuzzleCompleted()) {
  // If the puzzle is completed, show the completed state
  gameCompleted = true;
  initGame();
  disableAllTiles();
} else {
  initGame();
}