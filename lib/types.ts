export type CellType = "empty" | "wall" | "park"

export interface Cell {
    type: CellType
}

export type Grid = Cell[][]

export interface Level {
    name: string;
    width: number;
    height: number;
    starterCode: string;
    palette: CellType[];
    slides: string[];
    tasks: string[];
    validate: (grid: Grid, print: string[]) => Result[]
}

export type Command =
    | { type: "diff"; changes: Array<{ x: number; y: number; type: CellType }> }
    | { type: "done" }
    | { type: "error"; message: string }
    | {type: "print"; message: string}

export type ScoreBreakdown = {
    correct: boolean;
    usedLoop: boolean;
    lowRepetition: boolean;
    stars: 0 | 1 | 2 | 3;
}

export type Result = {
    passed: boolean;
    message: string
}