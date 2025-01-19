document.addEventListener('DOMContentLoaded', function() {
  const correctPassword = '2023-07-13'; // YYYY-MM-DD format
  const passwordInput = document.getElementById('password-input');
  const submitButton = document.getElementById('submit-button');
  const errorMessage = document.getElementById('error-message');
  const passwordContainer = document.getElementById('password-container');
  const letterContainer = document.getElementById('letter-container');
  const spotifyPlayer = document.getElementById('spotify-player');
  submitButton.addEventListener('click', function() {
      const enteredPassword = passwordInput.value;
      if (enteredPassword === correctPassword) {
          passwordContainer.style.display = 'none';
          letterContainer.style.display = 'block';
          spotifyPlayer.style.display = 'block';
          // Optional: Auto-play the Spotify playlist (may be blocked by browsers)
          spotifyPlayer.src += "?autoplay=1";
      } else {
          errorMessage.textContent = 'Incorrect date. Please try again.';
      }
  });
});