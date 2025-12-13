import { Grid, Level, Result } from "../types"


export const level2: Level = {
    name: "Level 2 - First Building",
    width: 12,
    height: 12,
    palette: ["wall", "park"],
    starterCode: `
// Goal1: place a single wall at the top left corner of the city.
// Goal2: place a park at (x = 5, y = 5).
// Example: place(6, 7, "wall) would put a wall at x = 6, y = 7
//Write your own code below:
  `.trim(),
    slides: [
        "In this level you'll learn how to call a function.",
        "A function is a reusable block of code you can call by its name.",
        "Here you have a function available: place(x, y, type).",
        "The first parameter x is the column, the second y is the row.",
        "The third parameter type is a string like \"wall\" that says what to place.",
    ],
    tasks: [],
    validate(grid: Grid) {
        if (grid[0][0].type === "wall" && grid[5][5].type === "park") {
            return [
                {
                    passed: true,
                    message: "Nice! You have called place() correctly."
                }
            ]
        }
        const res: Result[] = []
        if (grid[0][0].type !== "wall") {
            res.push({
                passed: false,
                message: "You failed to place a single wall at the top left corner of the city."
            })
        }
        if (grid[5][5].type !== "park") {
            res.push({
                passed: false,
                message: "You failed to place a park at (x = 5, y = 5)"
            })
        }
        return res
    }
};
