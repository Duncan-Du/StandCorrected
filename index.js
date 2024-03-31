/********** Kinect Interface ********************/

// var socket = new WebSocket("ws://cpsc484-02.stdusr.yale.internal:8888/frames");
// var host = "cpsc484-02.stdusr.yale.internal:8888";
//
// $(document).ready(function () {
//   frames.start();
//   sp2tx.start();
// });
//
// var frames = {
//   socket: null,
//
//   start: function () {
//     var url = "ws://" + host + "/frames";
//     frames.socket = new WebSocket(url);
//     frames.socket.onmessage = function (event) {
//       frames.show(JSON.parse(event.data));
//     }
//   },
//
//   show: function (frame) {
//     console.log(frame);
//   }
// };
//
// var sp2tx = {
//   socket: null,
//
//   start: function () {
//     var url = "ws://" + host + "/sp2tx";
//     sp2tx.socket = new WebSocket(url);
//     sp2tx.socket.onmessage = function (event) {
//       var text = event.data;
//       if (text !== "") {
//         console.log("/sp2tx recived: " + text);
//       }
//     }
//   }
// };
//
//
//
// var twod = {
//   socket: null,
//
//   // create a connection to the camera feed
//   start: function () {
//     var url = "ws://" + host + "/twod";
//     twod.socket = new WebSocket(url);
//
//     // whenever a new frame is received...
//     twod.socket.onmessage = function (event) {
//
//       // parse and show the raw data
//       twod.show(JSON.parse(event.data));
//     }
//   },
//
//   // show the image by adjusting the source attribute of the HTML img object previously created
//   show: function (twod) {
//     $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
//   },
// };

/********** Visualization ********************/
function setup() {

}

// Function to navigate
function navigateToPage() {
  console.log("button pressed")
  window.location.href = 'general_suggestions.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();

  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
