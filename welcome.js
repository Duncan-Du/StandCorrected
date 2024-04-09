var host = "cpsc484-02.stdusr.yale.internal:8888";

$(document).ready(function () {
	frames.start();
	sp2tx.start();
});

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
		const bodyId = person.body_id;
		const joints = person.joints;
		const shoulderLeft = joints[5]; // Index for SHOULDER_LEFT
		const shoulderRight = joints[12]; // Index for SHOULDER_RIGHT
		const handLeft = joints[8]; // Index for HAND_LEFT
		const handRight = joints[14]; // Index for HAND_RIGHT

		// Check if left hand is raised above the left shoulder
		if (
			handLeft.position.y > shoulderLeft.position.y &&
			handLeft.confidence >= 2
		) {
			this.selectOption(1, bodyId);
		}
		// Check if right hand is raised above the right shoulder
		else if (
			handRight.position.y > shoulderRight.position.y &&
			handRight.confidence >= 2
		) {
			this.selectOption(2, bodyId);
		}
	},

	selectOption: function (optionNumber, bodyId) {
		console.log(`Body ID ${bodyId} selected option ${optionNumber}`);
		if (optionNumber === 1) {
				// Option 1 selection
				console.log("Option 1 selected - Left hand raised");
				// Additional actions for Option 1
			} else if (optionNumber === 2) {
				//  Option 2 selection
				console.log("Option 2 selected - Right hand raised");
				// Navigate to the general_suggestions.html page
				window.location.href = "general_suggestions.html";
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
