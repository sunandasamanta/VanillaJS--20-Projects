// HTML elements
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

// Set Date Input with Today's Date
options = { year:'numeric', month: 'numeric', day: 'numeric'}
const today = new Date().toUTCString(options);
console.log(today);
dateElement.setAttribute('min', today);