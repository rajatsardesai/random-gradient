// DOM elements
const gradientCircle = document.getElementById('gradientCircle');
const primaryColorButton = document.getElementById('primaryColorButton');
const secondaryColorButton = document.getElementById('secondaryColorButton');
const gradientCodeToRightDisplay = document.getElementById('gradientToRightCode');
const gradientCodeToLeftDisplay = document.getElementById('gradientToLeftCode');
const gradientCodeToTopDisplay = document.getElementById('gradientToTopCode');
const gradientCodeToBottomDisplay = document.getElementById('gradientToBottomCode');
const customCursor = document.getElementById('customCursor');
const toastContainer = document.getElementById('toastContainer');

let currentDirection = "right";

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
const updateGradient = (direction = currentDirection) => {
    const directions = ["right", "left", "top", "bottom"];

    directions.forEach(dir => {
        const gradientStyle = `linear-gradient(to ${dir}, ${colors.primary}, ${colors.secondary})`;
        document.getElementById(`gradientTo${dir.charAt(0).toUpperCase() + dir.slice(1)}Code`).textContent = `background-image: ${gradientStyle};`;

        if (dir === direction) {
            gradientCircle.style.background = gradientStyle;
            currentDirection = dir;
        }
    });

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

// Event handler for copying and changing the directions of gradient code
const copyToClipboard = (element, direction) => {
    if (!element.textContent) return;
    navigator.clipboard.writeText(element.textContent)
        .then(() => {
            updateGradient(direction);

            setTimeout(() => {
                toastContainer.style.opacity = "1";
                setTimeout(() => toastContainer.style.opacity = "0", 2500);
            }, 100);
        })
        .catch((err) => console.error('Failed to copy text: ', err));
};

// Event listeners
primaryColorButton.addEventListener('click', () => changeColor('primary'));
secondaryColorButton.addEventListener('click', () => changeColor('secondary'));

// Event listeners for all gradient displays to change direction and copy text
gradientCodeToRightDisplay.addEventListener('click', () => copyToClipboard(gradientCodeToRightDisplay, "right"));
gradientCodeToLeftDisplay.addEventListener('click', () => copyToClipboard(gradientCodeToLeftDisplay, "left"));
gradientCodeToTopDisplay.addEventListener('click', () => copyToClipboard(gradientCodeToTopDisplay, "top"));
gradientCodeToBottomDisplay.addEventListener('click', () => copyToClipboard(gradientCodeToBottomDisplay, "bottom"));

// Initialize colors on page load
window.addEventListener('DOMContentLoaded', initializeRandomColors);

// Mousemove event listener to the document
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});
