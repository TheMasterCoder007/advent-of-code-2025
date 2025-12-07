/**
 * @file day2.ts - Day 2: Gift Shop
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-02
 *
 * @details
 * This program helps find all the invalid IDs that the younger elf put unto the system
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

// check all ranges for invalid ids
let invalidIdSum: number = 0;
let updatedInvalidIdSum: number = 0;
input.split(",").forEach((range: string) => {
  // split starting and ending ranges
  const rangeSplit: string[] = range.split("-");
  if (rangeSplit.length < 2) return;

  // check range of ids
  checkIdRange(rangeSplit[0], rangeSplit[1]);
});

console.log("The sum of all invalid ID's is " + invalidIdSum);
console.log("The updated sum of all invalid ID's is " + updatedInvalidIdSum);

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

/**
 * @description `checkIdRange` is used to check an ID range for invalid IDs. Invalid IDs are added to the SUM
 * variables.
 *
 * @param startId - Starting ID for range
 * @param endId - ending ID for range
 *
 * @return void
 */
function checkIdRange(startId: string, endId: string): void {
  // check each id in the range
  let id = startId;
  const endIdNum = parseInt(endId);
  while (parseInt(id) <= endIdNum) {
    let tempId: number = parseInt(id, 10);
    // update invalid id sum (part 1)
    if (isIdInvalid(id)) {
      invalidIdSum += tempId;
    }

    // update invalid id sum (part 2)
    if (isRepeatingSequence(id)) {
      updatedInvalidIdSum += tempId;
    }

    // increment id
    tempId++;
    id = tempId.toString();
  }
}

/**
 * @description `isIdInvalid` is used to check if the given ID is invalid by comparing its two halves.
 *
 * @param id - The ID to be validated.
 *
 * @return boolean - Returns true if the two halves of the ID are identical, otherwise returns false.
 */
function isIdInvalid(id: string): boolean {
  // split id in half and compare halves
  const id1: string = id.slice(0, id.length / 2);
  const id2: string = id.slice(id.length / 2);
  return id1 === id2;
}

/**
 * @description `isRepeatingSequence` is used to check if the ID contains a repeating pattern
 *
 * @param id - The ID to be validated
 *
 * @return boolean - Returns true if the ID is made up of a repeating pattern, otherwise returns false
 */
function isRepeatingSequence(id: string): boolean {
  const maxLength: number = id.length / 2;
  for (let index: number = 1; index <= maxLength; index++) {
    const pattern: string = id.slice(0, index);
    const result = id.match(RegExp(pattern, "g"));
    if (
      result &&
      result.length > 1 &&
      result.length === Math.ceil(id.length / index)
    ) {
      return true;
    }
  }

  return false;
}
