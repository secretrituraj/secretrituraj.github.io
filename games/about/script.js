// about.js

// Function to check the current time and display boxes accordingly
function checkTimeAndDisplayBoxes() {
    const now = new Date();

    // Get the current hours and minutes
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Box elements
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');

    // Reset all boxes at midnight
    if (hours === 0 && minutes === 0) {
        // Hide all boxes at midnight
        box1.style.display = 'none';
        box2.style.display = 'none';
        box3.style.display = 'none';
    }

    // Display Box 1 at or after 11:00 AM
    if (hours > 11 || (hours === 11 && minutes >= 0)) {
        box1.style.display = 'block';
    }

    // Display Box 2 at or after 1:30 PM
    if (hours > 13 || (hours === 13 && minutes >= 30)) {
        box2.style.display = 'block';
    }

    // Display Box 3 at or after 5:00 PM
    if (hours > 17 || (hours === 17 && minutes >= 0)) {
        box3.style.display = 'block';
    }
}

// Initial check when the page loads
document.addEventListener('DOMContentLoaded', function () {
    checkTimeAndDisplayBoxes();

    // Update every minute to check if a new box should be displayed
    setInterval(checkTimeAndDisplayBoxes, 60000);
});