/**
 * @file helperFunctions.ts - Helper Functions
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-01
 *
 * @details
 * This file contains all helper functions that are shared from challenge to challenge
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/
import * as fs from "fs";

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

/**
 * @description `getInputString` opens the file at the given file path and returns the complete input as a string
 *
 * @param filepath - file path to file to open
 *
 * @return string - complete input from the file as a string
 */
const getInputString = (filepath: string): string => {
  try {
    return fs.readFileSync(filepath, "utf-8");
  } catch (error) {
    console.error("File path not found. Unable to read file contents!");
  }

  return "";
};

/***********************************************************************************************************************
 * FUNCTION EXPORTS
 **********************************************************************************************************************/
export default getInputString;
