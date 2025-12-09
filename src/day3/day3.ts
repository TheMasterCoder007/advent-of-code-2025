/**
 * @file day3.ts - Day 3: Lobby
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-07
 *
 * @details
 * This program helps calculate the highest "joltage" rating for all battery banks. This is required to get the
 * escalator running again.
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/

import getInputString from "../helperFunctions";

/***********************************************************************************************************************
 * SOLUTION
 **********************************************************************************************************************/

// get the input as a string
const input: string = getInputString("input.txt");

// activate the max joltage rating for each battery bank
let totalJoltageRating: number = 0;
let totalSuperchargedJoltageRating: bigint = 0n;
input.split("\n").forEach((line: string) => {
  // process battery bank
  let bank: number[] = [];
  line.split("").forEach((battery: string) => bank.push(parseInt(battery)));

  // update joltage ratings
  totalJoltageRating += getMaxJoltageRating(bank);
  totalSuperchargedJoltageRating += getSuperchargedJoltageRating(bank);
});

// answers
console.log("The total output joltage rating is " + totalJoltageRating);
console.log(
  "The total supercharged output joltage rating is " +
    totalSuperchargedJoltageRating,
);

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

/**
 * @description `getMaxJoltageRating` calculates the joltage rating by selecting the two largest batteries from the
 * given bank and concatenating them into a single number.
 *
 * @param bank - An array of numbers representing the joltage ratings of a set of batteries.
 * @return number - The combined maximum joltage rating calculated from the two highest-rated batteries.
 */
function getMaxJoltageRating(bank: number[]): number {
  const battery1: number = Math.max(...bank.slice(0, -1));
  const battery1Index: number = bank.indexOf(battery1);
  const battery2: number = Math.max(...bank.slice(battery1Index + 1));

  return concatenateNumbers([battery1, battery2]);
}

/**
 * @description `getSuperchargedJoltageRating` calculates the supercharged joltage rating by selecting the 12 largest
 * batteries from the given bank and concatenating them into a single number.
 *
 * @param bank - An array of numbers representing the joltage ratings of a set of batteries.
 * @return number - The combined maximum supercharged joltage rating calculated from the 12 highest-rated batteries.
 */
function getSuperchargedJoltageRating(bank: number[]): bigint {
  // break the battery bank down to the largest 12-cell battery bank
  let batteryBank: number[] = [];
  let currentIndex: number = 0;
  while (batteryBank.length < 12) {
    const biggestBattery: number = Math.max(
      ...bank.slice(
        currentIndex,
        Math.min(bank.length, bank.length - (11 - batteryBank.length)),
      ),
    );
    batteryBank.push(biggestBattery);
    currentIndex = bank.indexOf(biggestBattery, currentIndex) + 1;
  }

  return BigInt(concatenateNumbers(batteryBank));
}

/**
 * @description `concatenateNumbers` concatenates an array of numbers into a single number.
 *
 * @param batteries - An array of numbers to be concatenated.
 * @return number - The resulting number formed by concatenating all numbers in the array.
 */
function concatenateNumbers(batteries: number[]): number {
  let joltage: string = "";
  batteries.forEach((battery: number) => (joltage += battery.toString()));
  // console.log("Joltage: " + joltage);
  return Number(joltage);
}
