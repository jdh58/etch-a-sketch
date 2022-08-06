let userInput = document.getElementById("size");
const sketcher = document.getElementById('sketcher');
let userSize = 0;
const DEFAULT_SIZE = 16;

/* Create a div element and give it the box CSS class.
this will be used to fill the grid */
const boxDiv = document.createElement('div');
boxDiv.classList.add('box');

/* When the user clicks confirm, change the grid to be the size
of the user's input */
document.getElementById('confirm').addEventListener('click', changeGrid);
document.getElementById('reset').addEventListener('click', changeGrid);

/* Start off with a 16x16 grid */
initializeGrid(DEFAULT_SIZE);

/* Change the grid to be the size of the user's input */
function changeGrid() {
    // Clear the existing grid
    sketcher.textContent = '';

    // Record the user's input, and clear the textbox
    userSize = userInput.value;
    userInput.value = '';
    
    // Don't allow inputs less than 0 or greater than 100
    if (userSize < 0) {
        userSize = 0;
    } else if (userSize > 100) {
        userSize = 100;
    }

    // Set up the CSS so the grid matches the user's input
    sketcher.style.gridTemplateColumns = `repeat(${userSize}, 1fr)`;
    sketcher.style.gridTemplateRows = `repeat(${userSize}, 1fr)`;

    // Add userInput^2 number of boxes to fill the grid
    for (let i = 0; i < userSize * userSize; i++) {
        sketcher.appendChild(boxDiv.cloneNode(true));
    }

    /* Select all box elements and add a event listener that
    looks for hover and calls function colorizeBoxes */
    let gridBoxes = document.querySelectorAll('.box')
    gridBoxes.forEach(element => 
        element.addEventListener('mouseover', colorizeBoxes, {once: true}))
}

function colorizeBoxes(e) {
    console.log(e);
}

function initializeGrid(size) {
    // Set up the CSS so the grid matches the default size
    sketcher.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketcher.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Add size^2 number of boxes to fill the grid
    for (let i = 0; i < size * size; i++) {
        sketcher.appendChild(boxDiv.cloneNode(true));
    }
}