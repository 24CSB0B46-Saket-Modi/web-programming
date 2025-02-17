function appendToDisplay(value) {
    // Append the clicked button value to the display
    document.getElementById('display').value += value;
}

function clearDisplay() {
    // Clear the display
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        // Replace ^ with ** for exponentiation and evaluate the expression
        const result = eval(display.value.replace(/\^/g, '**'));
        display.value = result; // Show the result in the display
    } catch (error) {
        display.value = 'Error'; // Show error if the expression is invalid
    }
}