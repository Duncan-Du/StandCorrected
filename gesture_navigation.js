// gesture_navigation.js
import config from './config.js';

const host = config.host;

export function setupFramesAndSocket(frames, sp2tx, waitSeconds=5) {
    const waitMilliseconds = waitSeconds * 1000;
    console.log("DEBUG: setupFramesAndSocket called");
    setTimeout(() => {
        console.log("DEBUG: Starting frames in gesture navigation");
        frames.start();
        sp2tx.start();
    }, waitMilliseconds);
}

export function processFrame(data, frames) {
    if (data.people) {
        for (const person of data.people) {
            frames.processPerson(person);
        }
    }
}

export function checkPosture(shoulderLeft, handLeft, shoulderRight, handRight, raiseThreshold, frames, bodyId) {
    const leftDiff = handLeft.position.y - shoulderLeft.position.y;
    //console.log("left hand - shoulder diff: " + leftDiff);
    //console.log("left hand confidence: " + handLeft.confidence);
    const rightDiff = handRight.position.y - shoulderRight.position.y;
    //console.log("right hand - shoulder diff: " + rightDiff);
    //console.log("right hand confidence: " + handLeft.confidence);
    if (leftDiff < -raiseThreshold) {
        frames.selectOption(1, bodyId);
    } else if (rightDiff < -raiseThreshold) {
        frames.selectOption(2, bodyId);
    }
}




