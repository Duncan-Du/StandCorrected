const LOCAL_DEV = true

var host = "cpsc484-02.stdusr.yale.internal:8888";
if (LOCAL_DEV) {
  host = "127.0.0.1:4444"
}


const VERTICAL_ALIGNMENT_THRESHOLD = 10; // Arbitrary for now, need to change later

function setup() {
  frames.start();
  sp2tx.start();
}


var frames = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/frames";
    this.socket = new WebSocket(url);
    this.socket.onmessage = function (event) {
      frames.processFrame(JSON.parse(event.data));
    };
  },

  processFrame: function (data) {
    if (data.people) {
      for (const person of data.people) {
        // Process each person's data
        this.processPerson(person);
      }
    }
  },

  processPerson: function (person) {
    console.log("Processing person data");
    const bodyId = person.body_id;
    const joints = person.joints;

    // joints of interest
    const jointIndices = {
      EAR_RIGHT: 31,
      SHOULDER_RIGHT: 12,
      // HIP_RIGHT: 22,
      // KNEE_RIGHT: 23,
      // ANKLE_RIGHT: 24
    };

    // Extracting the x-coordinates
    const xCoords = {};
    Object.keys(jointIndices).forEach(joint => {
      const index = jointIndices[joint];
      xCoords[joint] = joints[index].position.x;
    });

    // Check alignment
    let isAligned = true;
    let maxDiff = 0;
    const baseXCoord = xCoords['EAR_RIGHT']; // Use EAR_RIGHT (head) as reference
    Object.values(xCoords).forEach(xCoord => {
      if (Math.abs(xCoord - baseXCoord) > VERTICAL_ALIGNMENT_THRESHOLD) {
        isAligned = false;
        maxDiff = Math.max(maxDiff, Math.abs(xCoord - baseXCoord));
      }
    });

    if (isAligned) {
      console.log("Posture is good");
    } else {
      console.log("Posture is bad. Max diff: " + maxDiff);
    }
  },

};

var sp2tx = {
  socket: null,

  start: function () {
    var url = "ws://" + host + "/sp2tx";
    this.socket = new WebSocket(url);
    this.socket.onmessage = function (event) {
      var text = event.data;
      if (text !== "") {
        console.log("/sp2tx received: " + text);
      }
    };
  },
};


function navigateToPage() {
  console.log("button pressed")
  window.location.href = 'index.html';
}

// Event listener
document.addEventListener('DOMContentLoaded', function() {
  setup();

  document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
