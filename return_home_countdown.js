function setup() {

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
