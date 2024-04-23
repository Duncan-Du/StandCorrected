import {emergency_exit_frames} from './emergency_exit.js'
const SECONDS_TO_COUNTDOWN = 15;

function setup() {
  const emergencyExitButton = document.getElementById('emergencyExitButton');
  let countdownNumber = SECONDS_TO_COUNTDOWN;
  const countdownElement = document.getElementById('countdown');

  emergencyExitButton.style.display = 'none'; // hide the emergency exit button

  // Update the countdown every second
  const intervalId = setInterval(() => {
    countdownNumber--;
    countdownElement.textContent = countdownNumber;
    if (SECONDS_TO_COUNTDOWN - countdownNumber === 4) {
      console.log("4 Seconds have passed, enabling emergency exit function");
      emergencyExitButton.style.display = 'block'; // show the emergency exit button
      emergency_exit_frames.start();
    }

    if (countdownNumber <= 0) {
      clearInterval(intervalId);
      navigateToPage(); // redirect after countdown ends
    }
  }, 1000);
}



// Function to navigate
function navigateToPage() {
  window.location.href = 'index.html';
}


// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();
  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
