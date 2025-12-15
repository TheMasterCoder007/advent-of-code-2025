/**
 * @file day5.ts - Day 5: Cafeteria
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-11
 *
 * @details
 * This program helps the elves sort out the issues with their new inventory management system
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/

import getInputString from "../helperFunctions";

/***********************************************************************************************************************
 * CLASSES
 **********************************************************************************************************************/

class FreshProduceRange {
  startRange: number;
  endRange: number;

  constructor(startRange: number, endRange: number) {
    this.startRange = startRange;
    this.endRange = endRange;
  }
}

/***********************************************************************************************************************
 * SOLUTION
 **********************************************************************************************************************/

// get the input as a string
const input: string = getInputString("input.txt");

// split into fresh produce ranges and ingredient list
const inputSplit: string[] = input.split("\n\n");

// get fresh produce ranges
let freshProduceRanges: FreshProduceRange[] = [];
inputSplit[0].split("\n").forEach((range: string) => {
  const rangeData: string[] = range.split("-");
  freshProduceRanges.push(
    new FreshProduceRange(Number(rangeData[0]), Number(rangeData[1])),
  );
});

// remove overlapping ID's
freshProduceRanges = removeOverlappingIds(freshProduceRanges);

// get the total number of fresh items in the inventory
console.log(
  "The total number of fresh items in the inventory is " +
    getFreshInventoryTotal(inputSplit[1], freshProduceRanges),
);

// get the total number of possible fresh ID's
console.log(
  "The total number of possible fresh ID's is " +
    getFreshIdTotal(freshProduceRanges),
); // 368781479155858 (high)

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

/**
 * @brief `removeOverlappingIds` merges all overlapping id ranges to prevent a recount of ids
 *
 * @param ranges - an array of FreshProduceRange to be merged and sorted
 *
 * @return FreshProduceRange[] - the updated FreshProduceRange array with merged ranges
 */
function removeOverlappingIds(
  ranges: FreshProduceRange[],
): FreshProduceRange[] {
  // sort ranges
  ranges.sort(
    (a: FreshProduceRange, b: FreshProduceRange) =>
      a.startRange - b.startRange || a.endRange - b.endRange,
  );

  // merge overlapping ranges
  const mergedRanges: FreshProduceRange[] = [];
  let currentRange: FreshProduceRange = ranges[0];
  for (let index: number = 0; index < ranges.length; index++) {
    const nextRange: FreshProduceRange = ranges[index];
    if (nextRange.startRange <= currentRange.endRange) {
      currentRange.endRange = Math.max(
        currentRange.endRange,
        nextRange.endRange,
      );
    } else {
      mergedRanges.push(currentRange);
      currentRange = nextRange;
    }
  }

  mergedRanges.push(currentRange);

  return mergedRanges;
}

/**
 * @brief `getFreshInventoryTotal` is used to get the total number of ID's currently in the inventory that are fresh
 *
 * @param ids - string containing all ids currently in the inventory
 * @param freshRanges - fresh ID ranges
 *
 * @return number - total number of fresh items currently in inventory
 */
function getFreshInventoryTotal(
  ids: string,
  freshRanges: FreshProduceRange[],
): number {
  let freshItems: number = 0;
  ids.split("\n").forEach((id: string) => {
    for (let index: number = 0; index < freshRanges.length; index++) {
      if (
        Number(id) >= freshRanges[index].startRange &&
        Number(id) <= freshRanges[index].endRange
      ) {
        freshItems++;
        break;
      }
    }
  });

  return freshItems;
}

/**
 * @brief `getFreshIdTotal` is used to get the total number of fresh ID's that could be contained in inventory
 *
 * @param freshRanges - fresh ID ranges
 *
 * @return number - total number of fresh IDs that can be contained in inventory
 */
function getFreshIdTotal(freshRanges: FreshProduceRange[]): number {
  let freshIdTotal: number = 0;
  freshRanges.forEach((range: FreshProduceRange) => {
    freshIdTotal += range.endRange + 1 - range.startRange;
  });

  return freshIdTotal;
}
