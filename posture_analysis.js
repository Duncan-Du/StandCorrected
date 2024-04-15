import config from './config.js';
const host = config.host;


const VERTICAL_ALIGNMENT_THRESHOLD = 80; // Arbitrary for now, need to change later


export var frames = {
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
      // CLAVICLE_RIGHT: 11,
      SHOULDER_RIGHT: 12,
      // HIP_RIGHT: 22,
      // KNEE_RIGHT: 23,
      // ANKLE_RIGHT: 24
    };

    // Extracting the x-coordinates
    const zCoords = {};
    Object.keys(jointIndices).forEach(joint => {
      const index = jointIndices[joint];
      zCoords[joint] = joints[index].position.z;
    });

    // Check alignment
    let isAligned = true;
    let maxDiff = 0;
    const baseZCoord = zCoords['EAR_RIGHT']; // Use EAR_RIGHT (head) as reference
    Object.values(zCoords).forEach(zCoord => {
      if (Math.abs(zCoord - baseZCoord) > VERTICAL_ALIGNMENT_THRESHOLD) {
        isAligned = false;
        maxDiff = Math.max(maxDiff, Math.abs(zCoord - baseZCoord));
      }
    });


    console.log("Max diff: " + maxDiff);

    const debugElement = document.getElementById('debug');
    debugElement.textContent = "Posture Index = " + maxDiff;

    setInterval(() => {
      if (isAligned) {
        console.log("Posture is good");
        window.location.href = "after_scan-good_posture.html";
      } else {
        console.log("Posture is bad.");
        window.location.href = "after_scan-bad_posture.html";
      }
    }, 10000);


  },

};

export var sp2tx = {
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