# Project Stand Corrected

## Installation Instructions
To install any dependencies and run the project, follow these steps:

There are no dependencies other than JQuery found in the zip file. To run the project, utilize the zip file for the project and upload it to the proper website that will upload the project to the TV. For clarity, let’s walk through how we ran the project as Group 14 on TV 2. We named our zip file and the root folder of the zip to ‘Group_14’. Then, we navigated to this website to upload our project to the TV: [http://cpsc484-02.stdusr.yale.internal:8888/remote](http://cpsc484-02.stdusr.yale.internal:8888/remote). We entered our Yale Net ID and Project name as ‘Group 14’ and uploaded the zip file to the website. Then, to test our program, we entered the code on the website that corresponded to the TV. This code was found in the bottom right corner of TV 2. Then, we selected ‘Group 14’ on the website to run our program on the TV display.

## Project Description and Problem Space
The project is titled “Stand Corrected” and aims to assist users in correcting their posture. Our problem space reads as follows:

### Problem Space:
Some people have an undesirable or “bad” posture that has the potential to be corrected – learn how to correct posture.

### Critical Tasks Addressed:
1. **Learn about the benefits of correct posture**
2. **Correct standing posture based on personalized feedback**

### Solution Description:
- **Task #1:** The benefits of a correct posture are shown with both options. Telling the user that they will “feel more confident” and that correcting their posture is “excellent”.
- **Task #2:** With Option 1, personal feedback is provided by scanning the person to see if they have good posture and encouraging them to match with an example after a first scan. The system will tell the user how close their match is to the ideal posture. With Option 2, the user receives less personalized feedback without the consent of scanning but more generalized feedback, as indicated before they select Option 2.

## Constraints from the Deployment Environment
There may be a few constraints from the deployment environment:
- If there is more than one person in the environment (e.g., in front of the Kinect sensor), then the program will not be able to recognize which person to track and may not be deterministic.
- If the Kinect sensor view is not installed correctly, the posture analysis may be off:
    - If the sensor is tilted, that may lead to inaccurate measurements.
    - If the user’s torso is impeded by any physical barriers causing the sensor to not fully “see” the user in front of the TV, both gesture navigation and posture analysis will not work as intended in that case. As a result, it is paramount that there is no impediment to the sensor’s view. This enacts a height limit as well if a user is too short or tall to be visible by the sensor. 
- Our prototype is designed for able-bodied users that are able to stand and have two arms and two legs and are able to adjust their shoulders, neck, arms, and back position to adjust their posture.
- If the user cannot raise their hand for any reason (e.g., injury or low ceiling height), then gesture navigation will not function properly.

## Collaboration Record
The four of us met together:
- **4-19-2024 at 1 pm** to test our implementation on TV 2.
- **4-22-2024 at 8 pm** to continue refining our implementation on TV 2.
  We have also been working independently on each of our assigned sections and implementations.

### Student Name and NetID: Arya Bhushan (ab3563)
**Contribution:**
- Implemented: Ending - congrats
- After scan - bad posture
- Assisted with threshold testing and troubleshooting solutions on TV
- Implemented Emergency Exit Button in the following frames at the top Right-Hand Corner: Scanning, After Scan Bad Posture, After Scan Good Posture, General Suggestions, Celebration (to not have to go through the timer)
- Contributed to README

### Student Name and NetID: Duncan Du (wd333)
**Contribution:**
- Designed the general layout of these three screens
- Modularity improvements: Move all posture analysis to a single module (posture_analysis.js)
- New Features: Go Back to Welcome, Option 1 (scanned)
- Created a more rigorous scanning algorithm.
- A buffer between when a screen is loaded and when gesture recognition begins to avoid accidental triggers.
- A progress bar on the scanning screen
- Merged countdown screen with celebration
- Completed the README as it relates to posture scanning analysis

### Student Name and NetID: Jessie Hwang (jh2969)
**Contribution:**
- Improved visual layout of general suggestions screen and after scan bad posture screen
- Stylized index screen using CSS

### Student Name and NetID: Julia Levy (jrl224)
**Contribution:**
- Implemented: Option 2 (not scanned), After scan - good posture
- Move all navigation to a single module (gesture_navigation.js)
- Researched general tips and images to assess how the prototype works best for users
- Did research on how to best correct posture and make our program accessible to users of all abilities 
- Found all the images
- Formatting a consistent design theme across all themes including font and color schemes
- All CSS Style Guide, visual elements, and layout
- Implemented modularity, conciseness, and overall style of project
