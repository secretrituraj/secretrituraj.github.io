document.addEventListener('DOMContentLoaded', function() {
    // 'use strict' mode
    'use strict';

    const correctPassword = '2023-07-13'; // Replace with your desired date in YYYY-MM-DD format

    // DOM Elements
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-button');
    const errorMessage = document.getElementById('error-message');
    const passwordContainer = document.getElementById('password-container');
    const letterContainer = document.getElementById('letter-container');
    const playButton = document.getElementById('play-button');

    // Replace with your actual access token
    const token = '[BQAU9kRNo8mPrdILkqrWnKCV-ND7RrTFf4vQtG5meXDTxeKLCB5yr7_TX7chCTy1btTeORsv09Z4f50U4JpZCOe9bhmFNui-U4BUIkXp-ojnpTwAPx7CW49MnXtvByDMNU0K1QENZv665o4C7Xj1GqXPgcdzd3crEMHAMPRgDamQ7TAaAhlL9MLaUStszP-g93O3qV0ebC0V-I48ZQ]';

    // Variables for the player
    let player;
    let deviceId;

    function validatePassword() {
        errorMessage.textContent = ''; // Clear previous error messages
        const enteredPassword = passwordInput.value;

        if (!enteredPassword) {
            errorMessage.textContent = 'Please select a date.';
            passwordInput.focus();
        } else if (enteredPassword === correctPassword) {
            passwordContainer.style.display = 'none';
            letterContainer.style.display = 'flex';
            letterContainer.classList.add('show');

            // Initialize Spotify Player
            initializePlayer();
        } else {
            errorMessage.textContent = 'Incorrect date. Please try again.';
            passwordInput.focus();
        }
    }

    submitButton.addEventListener('click', validatePassword);

    // Allow 'Enter' key to submit
    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            validatePassword();
        }
    });

    // Function to initialize the Spotify Player
    function initializePlayer() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new Spotify.Player({
                name: 'Secret Letter Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                deviceId = device_id;
                // Optionally, you can start playback here
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect();

            // Enable the play button
            playButton.disabled = false;
        };
    }

    // Play music when the play button is clicked
    playButton.addEventListener('click', function() {
        if (deviceId) {
            playSong();
        } else {
            console.error('Device ID is not available.');
        }
    });

    // Function to play the playlist
    function playSong() {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({
                "context_uri": "spotify:playlist:0kOYAwYxRguDPvFIRqySoL", // Replace with your playlist URI
                "offset": {
                    "position": 0
                },
                "position_ms": 0
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            if (response.ok) {
                console.log('Playback started');
                playButton.style.display = 'none'; // Hide the play button after starting playback
            } else {
                console.error('Error starting playback:', response);
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }
});