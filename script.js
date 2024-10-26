let heightElem = document.getElementById("height");
let formElem = document.getElementById("draw-form");

// set a handler function for the form's submission event
formElem.onsubmit = function(event) {

    // QUIZ
    // what happens if we don't do this?
    // ANSWER: Without event.preventDefault(), the form would refresh the page upon submission,  erasing any output or data displayed on the page. This function stops the default form submission behavior.

    event.preventDefault();

    // QUIZ
    // what happens if we don't do this?
    // ANSWER: Without clearError(), any previous error messages and input styling (like red borders) would remain, even if the new input is correct. clearError() removes the previous error state.

    clearError();

    // Get the height entered by the user
    heightStr = heightElem.value;

    // TODO 1
    // if they didn't type anything at all, give a different error message,
    // something like "Please provide a height"
    if (heightStr.trim() === "") {
        displayError("Please provide a height");
        return;
    }

    // Convert the string to an integer
    height = parseInt(heightStr);

    // if the height is not-a-number, yell at them and exit early
    // TODO 2
    // negative numbers and zero should also be rejected here
    if (isNaN(height) || height <= 0) {
        displayError("Please enter a positive number for the height.");
        return;
    }

    // if the height is absurdly tall, yell at them and exit early
    let tooTall = 100;
    if (height > tooTall) {
        displayError("Are you crazy? I can't build a pyramid that tall.");
        return;
    }

    // Draw the pyramid with the specified height
    drawPyramid(height);
}


/**
 * displayError
 *
 * Displays an error message on the text input, and colors it red
 */
function displayError(message) {
    heightElem.className = "invalid-field";
    document.querySelector(".error-message").innerHTML = message;
}


/**
 * clearError
 *
 * Clears any error message and resets the input style
 */
function clearError() {
    heightElem.className = ""; // remove red border style
    document.querySelector(".error-message").innerHTML = ""; // clear error message
}


/**
 * drawPyramid
 *
 * Renders, in the HTML document, a Mario pyramid of the specified height
 */
function drawPyramid(height) {

    // Clear previous pyramid content
    document.getElementById("pyramid").innerHTML = "";

    // Loop to create each row of the pyramid
    for (let row = 0; row < height; row++) {

        // Calculate number of bricks and spaces for each row
        let numBricks = row + 2;
        let numSpaces = height - row - 1;

        // Build the row string with spaces and bricks
        let rowStr = "";
        for (let i = 0; i < numSpaces; i++) {
            let spaceChar = "&nbsp"; // this is the HTML encoding for a space " "
            rowStr += spaceChar;
        }
        for (let i = 0; i < numBricks; i++) {
            rowStr += "#";
        }

        // Create a <p> element for each row and insert it into the #pyramid container
        rowElem = document.createElement("p");
        rowElem.innerHTML = rowStr;
        document.getElementById("pyramid").appendChild(rowElem);
    }
}