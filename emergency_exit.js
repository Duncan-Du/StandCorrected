import config from './config.js';
import { emergencyExitCheck } from './gesture_navigation.js'

const host = config.host;

const EMERGENCY_EXIT_THRESHOLD = 200; // Manually tested, need to fine-tune


export var frames = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/frames";
    this.socket = new WebSocket(url);
    this.socket.onmessage = function (event) {
      frames.processFrame(JSON.parse(event.data));
    };
  },

  processPerson: function (person) {
        const bodyId = person.body_id;
        const joints = person.joints;

        const shoulderRight = joints[12];
        const handRight = joints[14];

        emergencyExitCheck(shoulderRight, handRight, EMERGENCY_EXIT_THRESHOLD, this, bodyId); // MAKE SURE TO CHANGE EMERGENCY THRESHOLD APPROPRIATELY
    },

  selectOption: function (optionNumber, bodyId) {
        // Option selection logic here
        console.log(`Body ID ${bodyId} selected option ${optionNumber}`);
           if (optionNumber === 3){
            console.log("Option 3 selected - Emergency Exit");
            window.location.href = "index.html";
          }
    },
};
