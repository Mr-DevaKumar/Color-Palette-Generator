// script.js
const moods = {
    happy: ["#FFDD00", "#FFAA00", "#FF5500", "#FF2200", "#FF0000"], // Yellow and orange tones
    sad: ["#0066CC", "#003366", "#002244", "#1E3A5A", "#A2B9D2"],   // Blue and dark tones
    calm: ["#B2D8D8", "#5F9E9E", "#3B7575", "#F2F2F2", "#D9F2F2"],   // Light blues and greens
    energetic: ["#FF5500", "#FF7700", "#FF9900", "#FFAA33", "#FFDD66"], // Warm, bright oranges and yellows
};

// Get elements from the DOM
const moodButtons = document.querySelectorAll('.mood-btn');
const colorElements = document.querySelectorAll('.color');
const hexElements = document.querySelectorAll('.hex-code');
const gradientStartInput = document.getElementById('gradientStart');
const gradientEndInput = document.getElementById('gradientEnd');
const generateGradientButton = document.getElementById('generateGradient');
const gradientDisplay = document.getElementById('gradientDisplay');

// Update color palette
function updatePalette(mood) {
    const palette = moods[mood];
    palette.forEach((color, index) => {
        colorElements[index].style.backgroundColor = color;
        hexElements[index].textContent = color;
    });
}

// Add event listener to mood buttons
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        updatePalette(mood);
    });
});

// Copy hex code to clipboard
hexElements.forEach((hexElement, index) => {
    hexElement.addEventListener('click', () => {
        const color = hexElement.textContent;
        navigator.clipboard.writeText(color)
            .then(() => {
                alert(`Copied: ${color}`);
            });
    });
});

// Generate gradient
generateGradientButton.addEventListener('click', () => {
    const startColor = gradientStartInput.value;
    const endColor = gradientEndInput.value;
    gradientDisplay.style.background = `linear-gradient(to right, ${startColor}, ${endColor})`;
});

// Initial palette display (optional)
updatePalette('happy');
