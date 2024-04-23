import {frames} from './posture_analysis.js';
import {emergency_exit_frames} from "./emergency_exit.js";

function setup() {
  frames.start();
  emergency_exit_frames.start();
}


function navigateToPage() {
  window.location.href = 'index.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function () {
  setup();

});
