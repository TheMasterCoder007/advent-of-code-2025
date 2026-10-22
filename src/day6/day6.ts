/**
 * @file day6.ts - Day 6: Trash Compactor
 *
 * @author Cory Lamming (TheMasterCoder007)
 * @version 1.0.0
 * @date 2025-12-15
 *
 * @details
 * This program helps young cephalopods with their math homework
 */

/***********************************************************************************************************************
 * IMPORTS
 **********************************************************************************************************************/

import getInputString from "../helperFunctions";

type Expression = {
  values: number[];
  operator: "+" | "*";
};

/***********************************************************************************************************************
 * SOLUTION
 **********************************************************************************************************************/

// get the input as a string
const input: string = getInputString("input.txt");

/***********************************************************************************************************************
 * PART 1
 **********************************************************************************************************************/

// organize math expressions into an array
const expressions: Expression[] = [];
input.split("\n").forEach((line: string) => {
  let index: number = 0;
  line.split(" ").forEach((value: string) => {
    if (value === "") return;

    // if the index doesn't exist, add an empty expression
    if (!expressions[index]) {
      expressions[index] = { values: [], operator: "*" };
    }

    // add new values
    if (value === "+" || value === "*") {
      expressions[index].operator = value;
    } else {
      expressions[index].values.push(Number(value));
    }

    // bump index
    index++;
  });
});

// solve math expressions
let answers: number[] = [];
expressions.forEach((expr: Expression) => {
  answers.push(solveMathExpression(expr));
});

// answers
console.log(
  "The grand total of the answers to all questions is " +
    getGrandTotal(answers),
);

/***********************************************************************************************************************
 * PART 2
 **********************************************************************************************************************/

// reset expressions
expressions.length = 0;

// reparse input to get new expressions
const parsed: string[] = input.split("\n");
const lines: number = parsed.length;
const rowLength: number = parsed[0].length;
let operator: string = "";
let values: string[] = [];
for (let col: number = 0; col < rowLength; col++) {
  let valueAsString: string = "";
  let endOfExpression = true;
  for (let row: number = 0; row < lines; row++) {
    if (parsed[row][col] === "+" || parsed[row][col] === "*") {
      operator = parsed[row][col];
      endOfExpression = false;
    } else if (isFinite(parseInt(parsed[row][col]))) {
      valueAsString += parsed[row][col];
      endOfExpression = false;
    }
  }

  // update values
  values.push(valueAsString);

  // only move on once the full expression is captured
  if (!endOfExpression && col !== rowLength - 1) {
    continue;
  }

  // should never hit this
  if (operator !== "*" && operator !== "+") {
    console.error("Operator for expression not found: column " + col);
    continue;
  }

  // add the new expression
  let newValues: number[] = values.map((value) => parseInt(value) || 0);
  newValues.reverse();
  expressions.push({
    values: newValues,
    operator: operator,
  });

  // reset for the next round
  operator = "";
  values.length = 0;
}

// solve math expressions
answers.length = 0;
expressions.forEach((expr: Expression) => {
  answers.push(solveMathExpression(expr));
});

// answers
console.log(
  "The true grand total of the answers to all questions is " +
    getGrandTotal(answers),
);

/***********************************************************************************************************************
 * HELPER FUNCTIONS
 **********************************************************************************************************************/

function solveMathExpression(expression: Expression): number {
  let answer: number = 0;
  if (expression.operator === "+") {
    expression.values.forEach((value: number) => (answer += value));
  } else {
    expression.values.forEach((value: number) => {
      if (answer === 0) {
        answer = value;
      } else {
        answer *= value;
      }
    });
  }

  return answer;
}

function getGrandTotal(totals: number[]) {
  let answer: number = 0;
  totals.forEach((value: number) => (answer += value));

  return answer;
}
