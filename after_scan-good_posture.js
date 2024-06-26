const SECONDS_TO_COUNTDOWN = 15;

function setup() {
  let countdownNumber = SECONDS_TO_COUNTDOWN;
  const countdownElement = document.getElementById('countdown');

  // Update the countdown every second
  const intervalId = setInterval(() => {
    countdownNumber--;
    countdownElement.textContent = countdownNumber;

    if (countdownNumber <= 0) {
      clearInterval(intervalId);
      navigateToPage(); // redirect after countdown ends
    }
  }, 1000);
}

// Function to navigate
function navigateToPage() {
  console.log("button pressed")
  window.location.href = 'index.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();

  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
