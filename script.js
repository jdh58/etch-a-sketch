let userSizeInput = document.getElementById("size");
const sketcher = document.getElementById('sketcher');
let userSize = 0;
const DEFAULT_SIZE = 16;

/* Create a div element and give it the box CSS class.
this element will be used to fill the grid */
const boxDiv = document.createElement('div');
boxDiv.classList.add('box');

/* Start off with a 16x16 grid */
initializeGrid(DEFAULT_SIZE);

/* When the user clicks 'CONFIRM', change the grid to be the size
of the user's input */
document.getElementById('confirm').addEventListener('click', changeGrid);
document.getElementById('reset').addEventListener('click', changeGrid);

/* Change the grid to be the size of the user's input */
function changeGrid() {
    // Clear the existing grid
    sketcher.textContent = '';

    // Record the user's input, and clear the textbox
    userSize = userSizeInput.value;
    userSizeInput.value = '';
    
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
        element.addEventListener('mouseover', colorizeBoxes))
}

/* Colorizes the hovered boxes.
    Potential features: 
        -User selected color
        -Brush hardness that changes the opacity increments
*/
function colorizeBoxes(e) {
    // Makes a variable for background color. Code readability purposes
    let background = e.target.style.backgroundColor;
    // This RegExp will return the alpha value of an rgba string
    const alphaValue = /\.\d+/;
    // Initialize opacity as 0 for each hover
    let opacity = 0;

    /* If the box hasn't yet been hovered over, set opacity to 0 */
    if (background == '') {
        opacity = 0;
    } /* Otherwise, set it to the alpha value of the current rgba string */
    else { 
        opacity = parseFloat(background.match(alphaValue));
    }
    /* Add 10% to the current opacity */
    opacity += .1;
    
    /* Update the bakground color
    Minor Issue: the 'background' variable doesn't work here */
    e.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
}

/* Sets the grid to the constant DEFAULT_SIZE */
function initializeGrid(size) {
    // Set up the CSS so the grid matches the default size
    sketcher.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketcher.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    // Add size^2 numbers of boxes to fill the grid
    for (let i = 0; i < size * size; i++) {
        sketcher.appendChild(boxDiv.cloneNode(true));
    }

    /* Select all box elements and add a event listener that
    looks for hover and calls function colorizeBoxes */
    let gridBoxes = document.querySelectorAll('.box')
    gridBoxes.forEach(element => 
        element.addEventListener('mouseover', colorizeBoxes))
}