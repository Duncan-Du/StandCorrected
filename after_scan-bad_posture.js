// Incorperating Modularity of gesture_navigation as of 4-18-2024
import config from './config.js';
import { setupFramesAndSocket, processFrame, checkPosture } from './gesture_navigation.js';

const host = config.host;
console.log("host: " + host);

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        this.socket = new WebSocket(url);
        this.socket.onmessage = function (event) {
            processFrame(JSON.parse(event.data), frames);
        };
    },

    processPerson: function (person) {
        const bodyId = person.body_id;
        const joints = person.joints;

        const shoulderLeft = joints[5];
        const handLeft = joints[8];
        const shoulderRight = joints[12];
        const handRight = joints[14];

        checkPosture(shoulderLeft, handLeft, shoulderRight, handRight, 200, this, bodyId);
    },

    selectOption: function (optionNumber, bodyId) {
        // Option selection logic here
        console.log(`Body ID ${bodyId} selected option ${optionNumber}`);
        if (optionNumber === 1) {
            console.log("Option 1 selected - Left hand raised");
            window.location.href = "scanning.html";
        } else if (optionNumber === 2) {
            console.log("Option 2 selected - Right hand raised");
            window.location.href = "celebration.html";
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




// Preserving old code from 4-15-2024:
// import config from './config.js';
// const host = config.host;


// // $(document).ready(function () {
// // 	frames.start();
// // 	sp2tx.start();
// // });

// function setup() {
// 	frames.start();
// 	sp2tx.start();
// }

// var frames = {
// 	socket: null,

// 	start: function () {
// 		var url = "ws://" + host + "/frames";
// 		this.socket = new WebSocket(url);
// 		this.socket.onmessage = function (event) {
// 			frames.processFrame(JSON.parse(event.data));
// 		};
// 	},

// 	processFrame: function (data) {
// 		if (data.people) {
// 			for (const person of data.people) {
// 				// Process each person's data
// 				this.processPerson(person);
// 			}
// 		}
// 	},

// 	processPerson: function (person) {
// 		const bodyId = person.body_id;
// 		const joints = person.joints;

// 		const shoulderLeft = joints[5];
// 		const handLeft = joints[8];
// 		const shoulderRight = joints[12];
// 		const handRight = joints[14];

// 		this.checkPosture(shoulderLeft, handLeft, shoulderRight, handRight, bodyId);
// 	},

// 	checkPosture: function (
// 		shoulderLeft,
// 		handLeft,
// 		shoulderRight,
// 		handRight,
// 		bodyId
// 	) {
// 		const raiseThreshold = 200; // The minimum distance the hand needs to be above the shoulder
// 		var leftDiff = handLeft.position.y - shoulderLeft.position.y;
// 		console.log("left hand - shoulder diff: " + leftDiff);
// 		console.log("left hand confidence: " + handLeft.confidence);
// 		var rightDiff = handRight.position.y - shoulderRight.position.y;
// 		console.log("right hand - shoulder diff: " + rightDiff);
// 		console.log("right hand confidence: " + handLeft.confidence);
// 		if (leftDiff < - raiseThreshold) {
// 			this.selectOption(1, bodyId);
// 		} else if (rightDiff < - raiseThreshold) {
// 			this.selectOption(2, bodyId);
// 		}
// 	},

// 	selectOption: function (optionNumber, bodyId) {
// 		console.log(`Body ID ${bodyId} selected option ${optionNumber}`);
// 		if (optionNumber === 1) {
// 			// Option 1 leads to scanning
// 			console.log("Option 1 selected - Left hand raised");
// 			window.location.href = "scanning.html";
// 		} else if (optionNumber === 2) {
// 			// Option 2 selection leads to celebration
// 			console.log("Option 2 selected - Right hand raised");
// 			window.location.href = "celebration.html";
// 		}
// 	},
// };

// var sp2tx = {
// 	socket: null,

// 	start: function () {
// 		var url = "ws://" + host + "/sp2tx";
// 		this.socket = new WebSocket(url);
// 		this.socket.onmessage = function (event) {
// 			var text = event.data;
// 			if (text !== "") {
// 				console.log("/sp2tx received: " + text);
// 			}
// 		};
// 	},
// };


// // Event listener
// document.addEventListener('DOMContentLoaded', function() {
//   setup();

//   document.getElementById('navigateButton').addEventListener('click', navigateToPage);
});
