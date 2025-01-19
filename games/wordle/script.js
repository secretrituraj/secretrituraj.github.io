document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const keyboard = document.getElementById('keyboard');
  const notificationContainer = document.getElementById('notification-container');
  const successAudio = document.getElementById('success-audio'); // Added

  // Game variables
  let currentRow = 0;
  let currentTile = 0;
  let isGameOver = false;

  // Use the word list from words.js
  const validWords = wordList; // wordList is defined in words.js

  // Calculate today's word index based on date
  const getWordOfTheDay = () => {
    const startDate = new Date(2022, 0, 1); // January 1, 2022
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const index = diffDays % validWords.length;
    return validWords[index].toLowerCase();
  };

  const targetWord = getWordOfTheDay();

  // Initialize the game
  createBoard();
  createKeyboard();

  // Event listeners
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'enter' || key === 'backspace' || (/^[a-z]$/.test(key))) {
      handleKeyPress(key);
    }
  });

  function createBoard() {
    for (let i = 0; i < 6; i++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      for (let j = 0; j < 5; j++) {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        rowElement.appendChild(tileElement);
      }
      gameBoard.appendChild(rowElement);
    }
  }

  function createKeyboard() {
    const keys = [
      ['q','w','e','r','t','y','u','i','o','p'],
      ['a','s','d','f','g','h','j','k','l'],
      ['enter','z','x','c','v','b','n','m','backspace']
    ];

    keys.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('key-row');
      row.forEach(key => {
        const keyElement = document.createElement('button');
        keyElement.textContent = key === 'backspace' ? '←' : key === 'enter' ? 'Enter' : key.toUpperCase();
        keyElement.setAttribute('data-key', key);
        keyElement.classList.add('key');
        if (key === 'enter' || key === 'backspace') {
          keyElement.classList.add('large');
        }
        keyElement.addEventListener('click', () => handleKeyPress(key));
        rowElement.appendChild(keyElement);
      });
      keyboard.appendChild(rowElement);
    });
  }

  function handleKeyPress(key) {
    if (isGameOver) return;

    if (key === 'enter') {
      checkGuess();
    } else if (key === 'backspace') {
      deleteLetter();
    } else if (/^[a-z]$/.test(key) && currentTile < 5) {
      addLetter(key);
    }
  }

  function addLetter(letter) {
    const row = gameBoard.children[currentRow];
    const tile = row.children[currentTile];
    tile.textContent = letter.toUpperCase();
    tile.setAttribute('data-letter', letter);
    tile.style.borderColor = '#565758'; // Change border color upon adding a letter
    currentTile++;
  }

  function deleteLetter() {
    if (currentTile > 0) {
      currentTile--;
      const row = gameBoard.children[currentRow];
      const tile = row.children[currentTile];
      tile.textContent = '';
      tile.removeAttribute('data-letter');
      tile.style.borderColor = '#3a3a3c'; // Reset border color upon deleting a letter
    }
  }

  function checkGuess() {
    const row = gameBoard.children[currentRow];
    let guess = '';
    const guessArray = [];

    for (let i = 0; i < 5; i++) {
      const tile = row.children[i];
      const letter = tile.getAttribute('data-letter');
      if (!letter) {
        showNotification('Not enough letters!');
        return;
      }
      guess += letter;
      guessArray.push({ letter, tile });
    }

    if (!validWords.includes(guess)) {
      showNotification('Word not in list!');
      return;
    }

    // Check letters
    const targetWordArray = targetWord.split('');
    const letterCount = {};

    // Count letters in target word
    targetWordArray.forEach(letter => {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    guessArray.forEach((guessItem, index) => {
      const letter = guessItem.letter;
      const tile = guessItem.tile;

      setTimeout(() => {
        tile.classList.add('flip');

        if (letter === targetWordArray[index]) {
          tile.classList.add('correct');
          updateKeyboard(letter, 'correct');
          letterCount[letter]--;
        } else if (targetWordArray.includes(letter) && letterCount[letter] > 0) {
          tile.classList.add('present');
          updateKeyboard(letter, 'present');
          letterCount[letter]--;
        } else {
          tile.classList.add('absent');
          updateKeyboard(letter, 'absent');
        }

        tile.style.color = '#ffffff';

        if (index === 4) {
          // After processing the last tile
          setTimeout(() => {
            if (guess === targetWord) {
              // Play success jingle
              playSuccessJingle();
              isGameOver = true;
            } else if (currentRow >= 5) {
              showNotification(`Game Over! The word was "${targetWord.toUpperCase()}".`);
              isGameOver = true;
            } else {
              currentRow++;
              currentTile = 0;
            }
          }, 500);
        }
      }, 500 * index);
    });
  }

  function updateKeyboard(letter, status) {
    const keyButtons = document.querySelectorAll('.key');
    keyButtons.forEach(keyButton => {
      if (keyButton.getAttribute('data-key') === letter) {
        // Only update if the new status is better
        if (!keyButton.classList.contains('correct')) {
          keyButton.classList.remove('correct', 'present', 'absent');
          keyButton.classList.add(status);
        }
      }
    });
  }

  function showNotification(message) {
    notificationContainer.textContent = message;
    notificationContainer.classList.add('show');
    setTimeout(() => {
      notificationContainer.classList.remove('show');
    }, 3000);
  }

  function playSuccessJingle() {
    successAudio.currentTime = 0; // Reset audio to the beginning
    successAudio.play();
  }
});