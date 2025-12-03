/**
 * @file day1.ts - Day 1: Secret Entrance
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-01
 *
 * @details
 * This program helps me get the new password needed to enter the North Pole
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/
import getInputString from "../helperFunctions";

/***********************************************************************************************************************
 * SOLUTION
 **********************************************************************************************************************/

// parse input
let dialPosition: number = 50;
let zeroCount1: number = 0;
let zeroCount2: number = 0;
const input: string = getInputString("input.txt");
input.split("\n").forEach((line) => {
  // get count of zero rollover events
  zeroCount2 += getZeroRolloverCount(line);

  // get landing position and count all times when it lands on zero
  const landingPosition = getLandingPosition(line);
  if (landingPosition !== -1) {
    dialPosition = landingPosition;
  }

  if (dialPosition === 0) zeroCount1++;
});

// write the answers to the console
console.log(
  "The number of instances where the dial landed on zero is " + zeroCount1,
);
console.log(
  "After finding the additional security document, the number of instances where the dial touched zero is " +
    zeroCount2,
);

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

/**
 * @description `getLandingPosition` is used to calculate the final landing position of the dial. It takes into
 * consideration that the dial rolls over when exceeding the dial bounds (0-99)
 *
 * @param rotationInstructions - string containing the direction and number of clicks to turn
 *
 * @return number - final landing position of the dial
 */
function getLandingPosition(rotationInstructions: string): number {
  const clicks = getNumberFromString(rotationInstructions);
  if (rotationInstructions.toLowerCase().includes("l")) {
    return (((dialPosition - clicks) % 100) + 100) % 100;
  } else if (rotationInstructions.toLowerCase().includes("r")) {
    return (((dialPosition + clicks) % 100) + 100) % 100;
  }

  console.warn(
    "No direction was found in rotation instructions. Instructions were: " +
      rotationInstructions,
  );
  return -1;
}

/**
 * @description `getZeroRolloverCount` is used to get the number of times the dial touches 0 during the rotation
 *
 * @param rotationInstructions - string containing the direction and number of clicks to turn
 *
 * @return number - number of times the dial touches 0
 */
function getZeroRolloverCount(rotationInstructions: string): number {
  const clicks = getNumberFromString(rotationInstructions);
  if (clicks !== -1) {
    if (rotationInstructions.toLowerCase().includes("l")) {
      const val: number = dialPosition === 0 ? 0 : 100;
      return Math.floor((val - dialPosition + clicks) / 100);
    } else if (rotationInstructions.toLowerCase().includes("r")) {
      return Math.floor((dialPosition + clicks) / 100);
    }
  }

  return 0;
}

/**
 * @description `getNumberFromString` is used to pull the number of clicks that the dial needs to be turned out of
 * the rotation instructions.
 *
 * @param rotationInstruction - string containing the direction and number of clicks to turn
 *
 * @return number - the number of clicks the dial needs to be moved
 */
function getNumberFromString(rotationInstruction: string): number {
  const rotationClicks = rotationInstruction.match(/\d+/);
  if (rotationClicks) {
    return parseInt(rotationClicks[0], 10);
  }

  console.warn(
    "No number found for rotation clicks. Instructions were: " +
      rotationInstruction,
  );
  return -1;
}
