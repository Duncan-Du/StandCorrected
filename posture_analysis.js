import config from './config.js';

const host = config.host;


const VERTICAL_ALIGNMENT_THRESHOLD = 2400; // Manually tested
const SCAN_LENGTH = 100; // samples to scan before ending the scan
const IGNORE_FIRST = 0.2; // amount of data to ignore before calculating the average
var maxDiffValues = [];

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
    const mean = Object.values(zCoords).reduce((acc, curr) => acc + curr, 0) / Object.values(zCoords).length;
    // calculate the mean squared deviation for the z-coordinates
    return Object.values(zCoords)
      .reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / Object.values(zCoords).length;
  },

  endScan: function () {
    console.log("Ending scan...");
    // ignore first 20%
    const sliceIndex = Math.floor(maxDiffValues.length * IGNORE_FIRST);
    const slicedMaxDiffValues = maxDiffValues.slice(sliceIndex);
    // count the amount below the threshold
    const belowThresholdCount = slicedMaxDiffValues.filter(value => value < VERTICAL_ALIGNMENT_THRESHOLD).length;
    console.log("Number of samples below threshold: " + belowThresholdCount);
    if (belowThresholdCount > slicedMaxDiffValues.length / 2) {
      console.log("Posture is good");
      window.location.href = "after_scan-good_posture.html";
    } else {
      console.log("Posture is bad.");
      window.location.href = "after_scan-bad_posture.html";
    }
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
    const avgConfidence = confidences.reduce((acc, curr) => acc + curr, 0) / confidences.length;
    if (avgConfidence > 1.99) {
      maxDiffValues.push(maxDiff);
    }

    // Update progress bar
    const progressBar = document.getElementById('scanProgress');
    if (progressBar) {
      progressBar.value = maxDiffValues.length;
    }

    console.log("MSD: " + maxDiff);

    // const debugElement = document.getElementById('debug');
    // debugElement.textContent = "Posture Index = " + maxDiff + ". Avg Confidence = " + avgConfidence + ".";

    if (maxDiffValues.length >= SCAN_LENGTH) {
      this.endScan();
    }

  },

};
