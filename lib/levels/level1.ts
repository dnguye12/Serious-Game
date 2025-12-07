import { Grid, Level, Result } from "../types"


export const level1: Level = {
    name: "Level 1 - Hello World",
    width: 12,
    height: 12,
    palette: ["wall"],
    starterCode: `
// Goal: print "Hello, World!" to the console.
  `.trim(),
    slides: [
        "Welcome! In this level you'll learn how to print text.",
        "In JavaScript, printing to the console is done with print(...).",
        "Strings are pieces of text wrapped in quotes, like \"Hello, World!\".",
        "Try writing: print(\"Hello, World!\")",
        "Run your code and check the console to see the output."
    ],
    validate(grid: Grid, print: string[]) {
        const res: Result[] = []
        if (print.length === 0) {
            res.push({
                passed: false,
                message: "You need to use the print() function"
            })
        }
        for (const line of print) {
            if (line === "Hello, World!") {
                return [{
                    passed: true,
                    message: "Printer goes brrrrrr"
                }]
            }
        }
        res.push({
            passed: false,
            message: "You need to print \"Hello, World!\" using the print() function."
        })
        return res
    }
};
