/**
 * @file day4.ts - Day 4: Printing Department
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-09
 *
 * @details
 * This program optimizes the elves forklift operation
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/

import getInputString from "../helperFunctions";

/***********************************************************************************************************************
 * CLASSES
 **********************************************************************************************************************/

class PaperRoll {
  row: number = -1;
  column: number = -1;
  paperRollPresent: boolean = false;
  sideN: boolean = false;
  sideNE: boolean = false;
  sideE: boolean = false;
  sideSE: boolean = false;
  sideS: boolean = false;
  sideSW: boolean = false;
  sideW: boolean = false;
  sideNW: boolean = false;

  constructor(init?: Partial<PaperRoll>) {
    Object.assign(this, init);
  }

  private static readonly adjacentSides: (keyof PaperRoll)[] = [
    "sideN",
    "sideNE",
    "sideE",
    "sideSE",
    "sideS",
    "sideSW",
    "sideW",
    "sideNW",
  ];

  getBlockedSidesCount(): number {
    return PaperRoll.adjacentSides.map((key) => this[key]).filter(Boolean)
      .length;
  }
}

/***********************************************************************************************************************
 * SOLUTION
 **********************************************************************************************************************/

// get the input as a string
const input: string = getInputString("input.txt");

// create a map of the floorspace based on the given diagram (puzzle input)
const paperRollMap = new Map<number, Map<number, PaperRoll>>();
input.split("\n").forEach((row: string, rowNum: number) => {
  row.split("").forEach((position: string, columnNum: number) => {
    addPaperRoll(
      createPaperRoll(rowNum, columnNum, position.includes("@")),
      paperRollMap,
    );
  });
});

/***********************************************************************************************************************
 * PART 1
 **********************************************************************************************************************/

// parse the map and add data for each location
for (const [row, columnMap] of paperRollMap) {
  for (const [column, paperRoll] of columnMap) {
    updateAdjacentPositions(paperRoll, paperRollMap);
  }
}

// search the map for all locations that are accessible (part 1)
let initialAccessibleRolls: number = 0;
for (const [row, columnMap] of paperRollMap) {
  for (const [column, paperRoll] of columnMap) {
    if (paperRoll.paperRollPresent && paperRoll.getBlockedSidesCount() < 4) {
      initialAccessibleRolls++;
    }
  }
}

// answers
console.log(
  "The initial number of accessible rolls of paper is " +
    initialAccessibleRolls,
);

/***********************************************************************************************************************
 * PART 2
 **********************************************************************************************************************/

let newRollsFound: number = 1;
let totalAccessibleRolls: number = 0;
while (newRollsFound > 0) {
  newRollsFound = 0;

  // parse the map and add data for each location
  for (const [row, columnMap] of paperRollMap) {
    for (const [column, paperRoll] of columnMap) {
      updateAdjacentPositions(paperRoll, paperRollMap);
    }
  }

  // search the map for all locations that are accessible (part 1)
  for (const [row, columnMap] of paperRollMap) {
    for (const [column, paperRoll] of columnMap) {
      if (paperRoll.paperRollPresent && paperRoll.getBlockedSidesCount() < 4) {
        totalAccessibleRolls++;
        newRollsFound++;
        paperRoll.paperRollPresent = false;
      }
    }
  }
}

console.log(
  "The total number of accessible rolls of paper is " + totalAccessibleRolls,
);

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

/**
 * @brief `createPaperRoll` creates a new paper roll and initializes the required data
 *
 * @param row - row number of location
 * @param column - column number of location
 * @param paperRollPresent - true if paper roll is present at this location, else false
 *
 * @return PaperRoll - returns initialized paper roll
 */
function createPaperRoll(
  row: number,
  column: number,
  paperRollPresent: boolean,
): PaperRoll {
  return new PaperRoll({
    row: row,
    column: column,
    paperRollPresent: paperRollPresent,
  });
}

/**
 * @brief `addPaperRoll` adds the paper roll into the map. If it already exists, it will overwrite the old value
 *
 * @param paperRoll - paper roll to be added to the map
 * @param map - map to which the paper roll will be added
 *
 * @return void
 */
function addPaperRoll(
  paperRoll: PaperRoll,
  map: Map<number, Map<number, PaperRoll>>,
): void {
  if (!map.has(paperRoll.row)) {
    map.set(paperRoll.row, new Map<number, PaperRoll>());
  }

  map.get(paperRoll.row)?.set(paperRoll.column, paperRoll);
}

/**
 * @brief `updateAdjacentPositions` searches the map for all adjacent positions to the current location and updates the
 * flag based on the presence of a paper roll at that position. Positions that do not exist or return undefined will be
 * considered false.
 *
 * @param paperRoll - current paper roll / location
 * @param map - map that can be used to search adjacent positions
 *
 * @return void
 */
function updateAdjacentPositions(
  paperRoll: PaperRoll,
  map: Map<number, Map<number, PaperRoll>>,
): void {
  // update north position
  paperRoll.sideN =
    map.get(paperRoll.row - 1)?.get(paperRoll.column)?.paperRollPresent ??
    false;

  //update north-east position
  paperRoll.sideNE =
    map.get(paperRoll.row - 1)?.get(paperRoll.column + 1)?.paperRollPresent ??
    false;

  //update east position
  paperRoll.sideE =
    map.get(paperRoll.row)?.get(paperRoll.column + 1)?.paperRollPresent ??
    false;

  //update south-east position
  paperRoll.sideSE =
    map.get(paperRoll.row + 1)?.get(paperRoll.column + 1)?.paperRollPresent ??
    false;

  //update south position
  paperRoll.sideS =
    map.get(paperRoll.row + 1)?.get(paperRoll.column)?.paperRollPresent ??
    false;

  //update south-west position
  paperRoll.sideSW =
    map.get(paperRoll.row + 1)?.get(paperRoll.column - 1)?.paperRollPresent ??
    false;

  //update west position
  paperRoll.sideW =
    map.get(paperRoll.row)?.get(paperRoll.column - 1)?.paperRollPresent ??
    false;

  //update south-west position
  paperRoll.sideNW =
    map.get(paperRoll.row - 1)?.get(paperRoll.column - 1)?.paperRollPresent ??
    false;
}
