import { Grid, Level } from "../types"


export const level3: Level = {
    name: "Level 3 - First Loop",
    width: 12,
    height: 12,
    palette: ["wall", "park"],
    starterCode: `
// Goal: build a vertical wall at x = 3 from y = 0..9.
//
// Hint: use a for-loop to repeat a call to place.
// Example loop pattern:
// for (var i = 0; i < 10; i++) {
//   // use i here
// }
//Write your own code below:
  `.trim(),
    slides: [
        "Now it's time for loops. Loops let you repeat code without copying it.",
        "A for-loop has three parts: start; condition; update.",
        "Example: for (var i = 0; i < 10; i++) { ... } runs the body 10 times.",
        "Inside the loop, i changes from 0 to 9. You can use i as a coordinate.",
        "To build a vertical wall at x = 3, loop over y and call place(3, i, \"wall\").",
        "This way, one short loop creates a whole wall instead of 10 manual calls."
    ],
    validate(grid: Grid) {
        for (let y = 0; y < 10; y++) {
            if (grid[y][3].type !== "wall") {
                return [{
                    passed: false,
                    message: `Missing wall segment at (x=3, y=${y}). You need a full vertical wall.`
                }]
            }
        }
        return [{
            passed: true,
            message: "Great! You used a loop to build a full vertical wall."
        }]
    }
};
