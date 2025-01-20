// script.js

// Global variables
let map; // Minimized map
let expandedMap; // Expanded map
let marker;
let expandedMarker;
let selectedLatLng;
let photoData = [];
let todayPhotos = []; // Photos for today's game
let currentPhotoIndex = 0;
let currentPhoto;
let totalScore = 0;

// Set viewport height CSS variable
function setVh() {
    // Calculate 1vh as 1% of the viewport height
    let vh = window.innerHeight * 0.01;
    // Set the value in the --vh custom property
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Run the function on initial load and when the window is resized
window.addEventListener('resize', setVh);
setVh();

// Initialize the game
window.onload = async function() {
    // Load photo data
    await loadPhotoData();

    // Select today's photos
    selectTodayPhotos();

    // Initialize minimized map
    initMap();

    // Load the first photo
    loadPhoto();

    // Resize minimized map
    resizeMaps();

    // Add event listeners
    setupEventListeners();
};

// Load photo data from data.json
async function loadPhotoData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        photoData = await response.json();
    } catch (error) {
        console.error('Error fetching data.json:', error);
        alert('Failed to load photo data. Please check the console for details.');
    }
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

// Initialize the minimized map
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
        keyboard: false
    }).setView([51.5, -0.1], 8); // Centered over South England

    // Set up map tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '' // Empty attribution for minimized map
    }).addTo(map);
}

// Initialize the expanded map (Initialized when modal is opened)
function initExpandedMap() {
    expandedMap = L.map('expanded-map').setView([51.5, -0.1], 8);

    // Set up map tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(expandedMap);

    // Add click event to expanded map
    expandedMap.on('click', function(e) {
        // Remove existing markers
        if (marker) {
            map.removeLayer(marker);
        }
        if (expandedMarker) {
            expandedMap.removeLayer(expandedMarker);
        }
        // Add markers to both maps
        selectedLatLng = e.latlng;
        marker = L.marker(selectedLatLng).addTo(map);
        expandedMarker = L.marker(selectedLatLng).addTo(expandedMap);
    });

    // Ensure the map is resized correctly
    setTimeout(function() {
        expandedMap.invalidateSize();
    }, 100);
}

// Load the current photo
function loadPhoto() {
    currentPhoto = todayPhotos[currentPhotoIndex];
    const photoElement = document.getElementById('photo');
    photoElement.src = 'photos/' + currentPhoto.filename;

    // Reset previous selections
    if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
    if (expandedMarker) {
        expandedMap.removeLayer(expandedMarker);
        expandedMarker = null;
    }
    selectedLatLng = null;
    document.getElementById('date-input').value = '';
    document.getElementById('result').style.display = 'none';
    document.getElementById('guess-button').style.display = 'block';

    // Reset maps view
    map.setView([51.5, -0.1], 8);
    if (expandedMap) {
        expandedMap.setView([51.5, -0.1], 8);
    }

    resizeMaps();
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

// Resize maps
function resizeMaps() {
    setTimeout(function() {
        map.invalidateSize();
        if (expandedMap) {
            expandedMap.invalidateSize();
        }
    }, 100);
}

// Setup event listeners for map expansion and modal
function setupEventListeners() {
    const mapContainer = document.getElementById('map-container');
    const mapModal = document.getElementById('map-modal');
    const closeModal = document.getElementById('close-modal');
    let expandedMapInitialized = false; // Flag to check if expandedMap is initialized

    // Open expanded map when minimized map is clicked
    mapContainer.addEventListener('click', function() {
        mapModal.style.display = 'block';

        if (!expandedMapInitialized) {
            initExpandedMap(); // Initialize expanded map
            expandedMapInitialized = true; // Set flag to true
        } else {
            // If already initialized, make sure to resize it
            setTimeout(function() {
                expandedMap.invalidateSize();
            }, 100);
        }
    });

    // Close expanded map when close button is clicked
    closeModal.addEventListener('click', function() {
        mapModal.style.display = 'none';
    });

    // Close expanded map when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target == mapModal) {
            mapModal.style.display = 'none';
        }
    });
}

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
    document.getElementById('result').style.display = 'none';
    const finalScoreElement = document.getElementById('final-score');
    finalScoreElement.textContent = `Your Final Score: ${totalScore} / 1000`;
    document.getElementById('final-result').style.display = 'block';
}