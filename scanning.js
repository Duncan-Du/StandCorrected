import {frames, sp2tx} from './posture_analysis.js';

function setup() {
  frames.start();
  sp2tx.start();
}


function navigateToPage() {
  window.location.href = 'index.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function () {
  setup();

  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
