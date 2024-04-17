import config from './config.js';

const host = config.host;


const VERTICAL_ALIGNMENT_THRESHOLD = 1000; // Arbitrary for now, need to change later


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

  calculateDeviation: function (zCoords) {
    const mean = Object.values(zCoords).reduce((acc, curr) => acc + curr, 0) /
      Object.values(zCoords).length;
    // calculate the mean squared deviation for the z-coordinates
    return Object.values(zCoords)
      .reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / Object.values(zCoords).length;
  },

  processPerson: function (person) {
    console.log("Processing person data");
    const bodyId = person.body_id;
    const joints = person.joints;

    // joints of interest
    const jointIndices = {
      EAR_RIGHT: 31,
      CLAVICLE_RIGHT: 11,
      SHOULDER_RIGHT: 12,
      PELVIS: 0,
      // HIP_RIGHT: 22,
      // KNEE_RIGHT: 23,
      // ANKLE_RIGHT: 24
    };

    // Extracting the z-coordinates
    const zCoords = {};
    const confidences = [];
    Object.keys(jointIndices).forEach(joint => {
      const index = jointIndices[joint];
      zCoords[joint] = joints[index].position.z;
      confidences.push(joints[index].confidence);
    });

    // Check alignment
    let maxDiff = this.calculateDeviation(zCoords);
    let isAligned = maxDiff < VERTICAL_ALIGNMENT_THRESHOLD;
    const avgConfidence = confidences.reduce((acc, curr) => acc + curr, 0) / confidences.length;

    console.log("MSD: " + maxDiff);

    const debugElement = document.getElementById('debug');
    debugElement.textContent = "Posture Index = " + maxDiff + ". Avg Confidence = " + avgConfidence + ".";

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