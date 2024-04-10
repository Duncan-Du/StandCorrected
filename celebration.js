const SECONDS_TO_COUNTDOWN = 5;

function setup() {
  let countdownNumber = SECONDS_TO_COUNTDOWN;

  // Update the countdown every second
  const intervalId = setInterval(() => {
    countdownNumber--;

    if (countdownNumber <= 0) {
      clearInterval(intervalId);
      navigateToPage(); // redirect after countdown ends
    }
  }, 1000);
}



// Function to navigate
function navigateToPage() {
  console.log("button pressed")
  window.location.href = 'return_home_countdown.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();

  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
