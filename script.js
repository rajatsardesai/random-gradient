// DOM elements
const gradientCircle = document.getElementById('gradientCircle');
const primaryColorButton = document.getElementById('primaryColorButton');
const secondaryColorButton = document.getElementById('secondaryColorButton');
const gradientCodeDisplay = document.getElementById('gradientCode');
const customCursor = document.getElementById('customCursor');

let colors = {
    primary: '',
    secondary: '',
};

// Function to generate random hex color
const generateRandomHexColor = () => {
    const hexCharacters = "0123456789abcdef";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
    }

    return color;
};

// Function to update gradient and display the code
const updateGradient = () => {
    const gradientStyle = `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`;
    gradientCircle.style.background=gradientStyle;
    gradientCodeDisplay.textContent = `background-image: ${gradientStyle}`;
};

// Function to set random colors initially
const initializeRandomColors = () => {
    colors.primary = generateRandomHexColor();
    colors.secondary = generateRandomHexColor();
    primaryColorButton.textContent = colors.primary;
    secondaryColorButton.textContent = colors.secondary;
    updateGradient();
};

// Event handler for changing primary or secondary color
const changeColor = (type) => {
    colors[type] = generateRandomHexColor();
    document.getElementById(`${type}ColorButton`).textContent = colors[type];
    updateGradient();
};

// Event handler for copying the gradient code
const copyToClipboard = () => {
    navigator.clipboard.writeText(gradientCodeDisplay.textContent)
        .then(() => alert('Gradient code copied to clipboard!'))
        .catch((err) => console.error('Failed to copy text: ', err));
};

// Event listeners
primaryColorButton.addEventListener('click', () => changeColor('primary'));
secondaryColorButton.addEventListener('click', () => changeColor('secondary'));
gradientCodeDisplay.addEventListener('click', copyToClipboard);

// Initialize colors on page load
window.addEventListener('DOMContentLoaded', initializeRandomColors);

// Mousemove event listener to the document
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});
