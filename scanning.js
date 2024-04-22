import {frames} from './posture_analysis.js';
import './emergency_exit.js';

function setup() {
  frames.start();
}


function navigateToPage() {
  window.location.href = 'index.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function () {
  setup();

  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
