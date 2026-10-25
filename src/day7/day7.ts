/**
 * @file day7.ts - Day 7: Laboratories
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2026-10-23
 *
 * @details
 * This program helps you fix the teleporter so you can exit the room
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/

import getInputString from "../helperFunctions";

/***********************************************************************************************************************
 * INTERFACES AND TYPES
 **********************************************************************************************************************/

interface Coordinate {
  row: number;
  column: number;
}

/***********************************************************************************************************************
 * CONSTANTS
 **********************************************************************************************************************/

const input: string[] = getInputString("input.txt").split("\n");
const start: Coordinate = { row: 0, column: input[0].indexOf("S") };

/***********************************************************************************************************************
 * SOLUTION: PART 1
 **********************************************************************************************************************/

let numberOfSplitters: number = 0;

// find all tachyon beams
const tachyonPaths: Set<number> = new Set<number>();
tachyonPaths.add(start.column);
input.forEach((line: string) => {
  const split: string[] = line.split("");

  tachyonPaths.forEach((value: number) => {
    if (split[value] === "^") {
      if (!tachyonPaths.has(value - 1)) {
        tachyonPaths.add(value - 1);
      }

      if (!tachyonPaths.has(value + 1)) {
        tachyonPaths.add(value + 1);
      }

      tachyonPaths.delete(value);
      numberOfSplitters++;
    }
  });
});

// get answer
console.log("Part 1: Number of tachyon beam splits = ", numberOfSplitters);

/***********************************************************************************************************************
 * SOLUTION: PART 2
 **********************************************************************************************************************/

// count total number of timelines line by line
let timelinePaths: Map<number, number> = new Map<number, number>();
timelinePaths.set(start.column, 1);
input.forEach((line: string) => {
  const split: string[] = line.split("");

  const newTimelinePaths: Map<number, number> = new Map<number, number>();
  timelinePaths.forEach((value: number, key: number) => {
    if (split[key] === "^") {
      const left: number = newTimelinePaths.get(key - 1) ?? 0;
      const right: number = newTimelinePaths.get(key + 1) ?? 0;
      newTimelinePaths.set(key - 1, value + left);
      newTimelinePaths.set(key + 1, value + right);
    } else {
      const count: number = newTimelinePaths.get(key) ?? 0;
      newTimelinePaths.set(key, value + count);
    }
  });

  timelinePaths = newTimelinePaths;
});

let timelines: number = 0;
timelinePaths.forEach((value: number) => {
  timelines += value;
});

// get answer
console.log("Part 2: Number of timelines = ", timelines);
