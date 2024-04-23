import {emergency_exit_frames} from './emergency_exit.js'
const SECONDS_TO_COUNTDOWN = 15;

function setup() {
  const emergencyExitLargeText = document.getElementById('exitLargeText');
  const emergencyExitSmallText = document.getElementById('exitSmallText');
  let countdownNumber = SECONDS_TO_COUNTDOWN;
  const countdownElement = document.getElementById('countdown');

  // emergencyExitButton.style.display = 'none';

  // Update the countdown every second
  const intervalId = setInterval(() => {
    countdownNumber--;
    countdownElement.textContent = countdownNumber;
    if (SECONDS_TO_COUNTDOWN - countdownNumber === 4) {
      console.log("4 Seconds have passed, enabling emergency exit function");
      emergencyExitLargeText.textContent = "Hold up your right hand 🖐";
      emergencyExitSmallText.textContent = "to exit and return to the home screen ";
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
  window.location.href = 'celebration.html';
}


// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();
  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
