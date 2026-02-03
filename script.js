// Valentine Website JavaScript

// DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionCard = document.getElementById('questionCard');
const successCard = document.getElementById('successCard');

// No Button Text Variations
const noTexts = [
    'No',
    'Are you sure?',
    'Really sure?',
    'Think again!',
    'Pretty please?',
    'Last chance!',
    'Don\'t do this...',
    'I\'ll be sad...',
    'You\'re breaking my heart!',
    'Just say yes!',
    'Please? 🥺'
];

let noClickCount = 0;
let isEscaping = false;

// Yes Button Click Handler
yesBtn.addEventListener('click', function() {
    // Hide question card, show success card
    questionCard.style.display = 'none';
    successCard.style.display = 'block';

    // Hide the escaped No button if visible
    noBtn.style.display = 'none';
});

// No Button Hover Escape (Desktop)
noBtn.addEventListener('mouseenter', function() {
    escapeNoButton();
});

// No Button Touch Handler (Mobile)
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    escapeNoButton();
}, { passive: false });

// No Button Click Handler (fallback)
noBtn.addEventListener('click', function() {
    escapeNoButton();
});

// Escape Function
function escapeNoButton() {
    noClickCount++;

    // Change text
    if (noClickCount < noTexts.length) {
        noBtn.textContent = noTexts[noClickCount];
    }

    // Make button start escaping after first hover
    if (!isEscaping) {
        isEscaping = true;
        noBtn.classList.add('escaping');
    }

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe area (keep button visible)
    const padding = 20;
    const maxX = viewportWidth - btnWidth - padding;
    const maxY = viewportHeight - btnHeight - padding;

    // Generate random position
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    // Move button to random position
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Reduce size slightly each time (min 60%)
    const currentScale = 1 - (noClickCount * 0.05);
    const minScale = 0.6;
    noBtn.style.transform = `scale(${Math.max(currentScale, minScale)})`;

    // Make Yes button grow slightly to be more appealing
    const yesScale = 1 + (noClickCount * 0.03);
    const maxYesScale = 1.3;
    yesBtn.style.transform = `scale(${Math.min(yesScale, maxYesScale)})`;
}

// Handle window resize (keep escaped button in bounds)
window.addEventListener('resize', function() {
    if (isEscaping) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = noBtn.getBoundingClientRect();

        // Check if button is out of bounds and reposition
        if (btnRect.right > viewportWidth || btnRect.bottom > viewportHeight) {
            noBtn.style.left = Math.min(parseFloat(noBtn.style.left), viewportWidth - noBtn.offsetWidth - 20) + 'px';
            noBtn.style.top = Math.min(parseFloat(noBtn.style.top), viewportHeight - noBtn.offsetHeight - 20) + 'px';
        }
    }
});
