import config from './config.js';

const host = config.host;

const EMERGENCY_EXIT_THRESHOLD = 200; // Manually tested, need to fine-tune

function emergencyExitCheck(shoulderRight, handRight, emergencyThreshold, frames, bodyId){
    const rightDiff = handRight.position.y - shoulderRight.position.y;
    console.log("right hand - shoulder diff: " + rightDiff);
    console.log("right hand confidence: " + handRight.confidence);
    if (rightDiff < -emergencyThreshold){
        emergency_exit_frames.selectOption(3, bodyId);
    }
}



export var emergency_exit_frames = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/frames";
    this.socket = new WebSocket(url);
    this.socket.onmessage = function (event) {
      emergency_exit_frames.processFrame(JSON.parse(event.data));
    };
  },

  processFrame: function (data) {
    if (data.people) {
      for (const person of data.people) {
        emergency_exit_frames.processPerson(person);
      }
    }
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
