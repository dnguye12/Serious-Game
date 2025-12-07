import { Grid, Level } from "../types"


export const level4: Level = {
    name: "Level 4 - Conditions",
    width: 12,
    height: 12,
    palette: ["wall", "park"],
    starterCode: `
// Goal: build a checker pattern on the top row (y = 0) with wall and park:
// place walls at even x positions (0, 2, 4, 6, 8) and parks at odd x positions.
//
// Hint:
// - Use a for-loop over x from 0 to 9.
// - Use an if-statement to check if x is even: x % 2 === 0
  `.trim(),
    slides: [
        "Conditionals let you run code only when some condition is true.",
        "In JavaScript, an if-statement looks like: if (condition) { /* code */ }",
        "The condition must be something that is either true or false.",
        "We can test if a number is even with x % 2 === 0 (remainder of division by 2 is 0).",
        "In this level, loop x from 0 to 9 and only place a wall when x is even.",
        "Result: a checker pattern on the top row with walls at x = 0, 2, 4, 6, 8."
    ],
    validate(grid: Grid) {
        for (let x = 0; x < 10; x += 2) {
            if (grid[0][x].type !== "wall") {
                return [{
                    passed: false,
                    message: `Even position x=${x} on the top row should have a wall.`
                }]
            }
        }
        for (let x = 1; x < 10; x += 2) {
            if (grid[0][x].type !== "park") {
                return [{
                    passed: false,
                    message: `Odd position x=${x} on the top row should have a park.`
                }]
            }
        }
        return [{
            passed: true,
            message: "Nice conditional logic! You built the correct checker pattern."
        }]
    }
};
