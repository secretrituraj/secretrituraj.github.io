document.addEventListener('DOMContentLoaded', function() {
  const correctPassword = '2023-07-13'; // YYYY-MM-DD format
  const passwordInput = document.getElementById('password-input');
  const submitButton = document.getElementById('submit-button');
  const errorMessage = document.getElementById('error-message');
  const passwordContainer = document.getElementById('password-container');
  const letterContainer = document.getElementById('letter-container');
  const spotifyPlayer = document.getElementById('spotify-player');
  spotifyPlayer.src += "?autoplay=1";

  submitButton.addEventListener('click', function() {
      errorMessage.textContent = ''; // Clear previous error messages
      const enteredPassword = passwordInput.value;

      if (enteredPassword === '') {
          errorMessage.textContent = 'Please select a date.';
          passwordInput.focus();
      } else if (enteredPassword === correctPassword) {
          passwordContainer.style.display = 'none';
          letterContainer.style.display = 'flex';
          letterContainer.classList.add('show'); // Add class for fade-in effect


      } else {
          errorMessage.textContent = 'Incorrect date. Please try again.';
          passwordInput.focus();
      }
  });

  // Allow 'Enter' key to submit
  passwordInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          submitButton.click();
      }
  });
});