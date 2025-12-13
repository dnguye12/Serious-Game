/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellType, Command, Grid } from "@/lib/types"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Interpreter from "js-interpreter"

let grid: Grid = []
let changes: Array<{ x: number; y: number; type: CellType }> = []

const flush = () => {
    if (changes.length > 0) {
        (postMessage as any)({ type: "diff", changes } satisfies Command);
        changes = []
    }
}

const place = () => {
    return (x: number, y: number, type: string) => {
        if (typeof x !== "number" || typeof y !== "number") {
            return
        }
        if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
            return
        }
        const t = type as CellType
        if (grid[y][x].type !== t) {
            grid[y][x] = { type: t }
            changes.push({ x, y, type: t })
        }
    }
}

const print = (message: string) => {
    (postMessage as any)({ type: "print", message } satisfies Command)
}

function buildApi(interpreter: any, global: any) {
    interpreter.setProperty(global, "place", interpreter.createNativeFunction(place()))
    interpreter.setProperty(global, "print", interpreter.createNativeFunction((msg: any) => print(String(msg))))
    interpreter.setProperty(global, "width", interpreter.createNativeFunction(() => grid[0].length))
    interpreter.setProperty(global, "height", interpreter.createNativeFunction(() => grid.length))
    interpreter.setProperty(global, "isEmpty", interpreter.createNativeFunction((x: number, y: number) => grid[y]?.[x].type === "empty"))
}

interface InitMsg {
    type: "init";
    width: number;
    height: number;
    code: string;
    palette: CellType[];
    maxSteps?: number;
}

self.onmessage = (e: MessageEvent<InitMsg>) => {
    const msg = e.data
    if (msg.type !== "init") {
        return
    }

    const { width, height, code, maxSteps = 100000 } = msg
    grid = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => ({ type: "empty" as const }))
    );
    changes = []

    try {
        const interpreter = new Interpreter(code, (intrp: any, global: any) => buildApi(intrp, global))

        let steps = 0
        const pump = () => {
            const start = performance.now()
            while (interpreter.step()) {
                steps++
                if (steps % 2000 === 0 || performance.now() - start > 8) {
                    flush()
                    setTimeout(pump, 0)
                    if (steps > maxSteps) {
                        throw new Error("Step limit exceeded (possible infinite loop).");
                    }
                    return
                }
            }
            flush();
            (postMessage as any)({ type: "done" }) satisfies Command
        }
        pump()
    } catch (error: any) {
        (postMessage as any)({
            type: "error",
            message: String(error?.message || error)
        } as Command)
    }
}