// Global variables
let map;
let marker;
let selectedLatLng;
let photoData = [];
let todayPhotos = []; // Photos for today's game
let currentPhotoIndex = 0;
let currentPhoto;
let totalScore = 0;

// Initialize the game
window.onload = async function() {
    // Load photo data
    await loadPhotoData();

    // Select today's photos
    selectTodayPhotos();

    // Initialize map
    initMap();

    // Load the first photo
    loadPhoto();
}

// Load photo data from data.json
async function loadPhotoData() {
    const response = await fetch('data.json');
    photoData = await response.json();
}

// Select 5 photos for today's game based on the date
function selectTodayPhotos() {
    // Use the current date as a seed
    const date = new Date();
    const seed = date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();

    // Shuffle the photos using the seed
    todayPhotos = shuffleArrayWithSeed(photoData, seed).slice(0, 5);
}

// Shuffle array with a seed
function shuffleArrayWithSeed(array, seed) {
    let shuffledArray = array.slice();
    let m = shuffledArray.length, t, i;

    while (m) {
        i = Math.floor(random(seed++) * m--);
        t = shuffledArray[m];
        shuffledArray[m] = shuffledArray[i];
        shuffledArray[i] = t;
    }
    return shuffledArray;
}

// Seeded random number generator
function random(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Initialize the map using Leaflet.js
function initMap() {
    map = L.map('map').setView([51.5, -0.1], 8); // Centered over South England

    // Set up map tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add click event to the map
    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        selectedLatLng = e.latlng;
        marker = L.marker(selectedLatLng).addTo(map);
    });
}

// Load the current photo
function loadPhoto() {
    currentPhoto = todayPhotos[currentPhotoIndex];
    console.log('Loading photo:', currentPhoto.filename);
    const photoElement = document.getElementById('photo');
    photoElement.src = 'photos/' + currentPhoto.filename;
    console.log('Photo src set to:', photoElement.src);

    // Reset previous selections
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
    selectedLatLng = null;
    document.getElementById('date-input').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('guess-button').style.display = 'block';
}

// Handle the guess submission
document.getElementById('guess-button').addEventListener('click', function() {
    // Get user's selected date
    const guessedDate = document.getElementById('date-input').value;
    if (!selectedLatLng || !guessedDate) {
        alert('Please select a location on the map and choose a date.');
        return;
    }

    // Calculate distance between guessed location and actual location
    const guessedLatLng = selectedLatLng;
    const actualLatLng = L.latLng(currentPhoto.latitude, currentPhoto.longitude);
    const distance = guessedLatLng.distanceTo(actualLatLng); // in meters

    // Calculate date difference
    const guessedTime = new Date(guessedDate).getTime();
    const actualTime = new Date(currentPhoto.date).getTime();
    const timeDiff = Math.abs(guessedTime - actualTime);
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // in days

    // Calculate scores
    const distanceScore = calculateDistanceScore(distance);
    const dateScore = calculateDateScore(dayDiff);
    const roundScore = distanceScore + dateScore;

    totalScore += roundScore;

    // Display results
    document.getElementById('distance-result').textContent = `Distance Score: ${distanceScore} points`;
    document.getElementById('date-result').textContent = `Date Score: ${dateScore} points`;
    document.getElementById('total-score').textContent = `Total Score: ${totalScore} / ${(currentPhotoIndex + 1) * 200}`;

    document.getElementById('result').style.display = 'block';
    document.getElementById('guess-button').style.display = 'none';

    // Optional: Show the actual location on the map
    L.circle(actualLatLng, {
        color: 'red',
        radius: 5000 // 5 km radius for visibility
    }).addTo(map);

    // If last photo, change "Next Photo" button to "View Final Score"
    if (currentPhotoIndex >= todayPhotos.length - 1) {
        document.getElementById('next-button').textContent = 'View Final Score';
    }
});

// Handle "Next Photo" button
document.getElementById('next-button').addEventListener('click', function() {
    currentPhotoIndex++;
    if (currentPhotoIndex < todayPhotos.length) {
        loadPhoto();
    } else {
        // Game over, display final score
        displayFinalScore();
    }
});

// Calculate distance score
function calculateDistanceScore(distance) {
    distance = distance / 1000; // Convert to km
    let score = 0;
    if (distance <= 10) {
        score = 100;
    } else if (distance <= 25) {
        score = 80;
    } else if (distance <= 50) {
        score = 60;
    } else if (distance <= 100) {
        score = 40;
    } else {
        score = 20;
    }
    return score;
}

// Calculate date score
function calculateDateScore(dayDiff) {
    let score = 0;
    if (dayDiff <= 2) {
        score = 100;
    } else if (dayDiff <= 7) {
        score = 80;
    } else if (dayDiff <= 14) {
        score = 60;
    } else if (dayDiff <= 30) {
        score = 40;
    } else {
        score = 20;
    }
    return score;
}

// Display final score
function displayFinalScore() {
    document.getElementById('game-container').style.display = 'none';
    const finalScoreElement = document.getElementById('final-score');
    finalScoreElement.textContent = `Your Final Score: ${totalScore} / 1000`;
    document.getElementById('final-result').style.display = 'block';
}

// Format distance in km or meters (optional, not used in new scoring)
function formatDistance(distance) {
    if (distance >= 1000) {
        return (distance / 1000).toFixed(2) + ' km';
    } else {
        return distance.toFixed(2) + ' meters';
    }
}
// Inside your initialization functions
function initMap() {
    map = L.map('map').setView([51.5, -0.1], 8);

    // Map tiles setup
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Map click event
    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        selectedLatLng = e.latlng;
        marker = L.marker(selectedLatLng).addTo(map);
    });
}

// In your window.onload or after the map is shown
function resizeMap() {
    setTimeout(function() {
        map.invalidateSize();
    }, 100);
}

// Call resizeMap after the map is initialized
window.onload = async function() {
    // Existing initialization code
    await loadPhotoData();
    selectTodayPhotos();
    initMap();
    loadPhoto();

    // Resize the map
    resizeMap();
}