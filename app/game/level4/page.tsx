"use client"

import Editor from "@/components/Editor";
import GridCanvas from "@/components/GridCanvas";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Command, Grid, Result } from "@/lib/types";
import { ArrowLeftIcon, SquareChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Instructions from "./components/Instructions";
import Status from "@/components/Status";
import EndDialog from "@/components/EndDialog";

const Page = () => {
    const [grid, setGrid] = useState<Grid>(() =>
        Array.from({ length: 12 }, () =>
            Array.from({ length: 12 }, () => ({ type: "empty" as const })))
    )
    const [res, setRes] = useState<Result[]>([])
    const [code, setCode] = useState((`
//Starter code
/*
// Old way:
// place(0, 5, "wall");
// place(1, 5, "wall");
// place(2, 5, "wall");
// place(3, 5, "wall");
// place(4, 5, "wall");
// place(5, 5, "wall");
*/

// New way: a loop that does the same thing:
for (var x = 0; x <= 5; x = x + 1) {
  place(x, 5, "wall");
}
    `).trim())
    const [tasks, setTasks] = useState({
        task1: false,
        task2: false,
        task3: false
    })
    const [error, setError] = useState<string[]>([])
    const [runIndex, setRunIndex] = useState(0)
    const [lastDoneRunId, setLastDoneRunId] = useState<number | null>(null)
    const [end, setEnd] = useState<boolean>(false)
    const workerRef = useRef<Worker | null>(null)

    const freshGrid = () =>
        Array.from({ length: 12 }, () =>
            Array.from({ length: 12 }, () => ({ type: "empty" as const }))
        );

    const run = () => {
        const id = runIndex + 1
        setRunIndex(id)
        setGrid(freshGrid())
        setError([])
        setRes([])

        if (workerRef.current) {
            workerRef.current.terminate()
        }
        workerRef.current = new Worker(new URL("../../../workers/interpreter.worker.ts", import.meta.url), { type: "module" })

        workerRef.current.onmessage = (e: MessageEvent<Command>) => {
            const msg = e.data
            if (msg.type === "diff") {
                setGrid((g) => {
                    const copy = g.map((row) => row.slice())
                    for (const c of msg.changes) {
                        copy[c.y][c.x] = { type: c.type }
                    }
                    return copy
                })
            } else if (msg.type === "done") {
                setLastDoneRunId(id)
            } else if (msg.type === "error") {
                setError(prev => [...prev, msg.message])
            }
        }

        workerRef.current.postMessage({
            type: "init",
            width: 12,
            height: 12,
            code,
            maxSteps: 100_000,
        })
    }

    useEffect(() => {
        if (lastDoneRunId === runIndex) {
            const valid = async () => {
                if (!tasks.task1) {
                    let passed = true
                    for (let i = 0; i <= 5; i++) {
                        if (grid[5][i].type !== "wall") {
                            passed = false
                        }
                    }

                    if (passed) {
                        setTasks(prev => ({
                            ...prev,
                            task1: true
                        }))
                    } else {
                        setRes(prev => [...prev, {
                            passed: false,
                            message: "Please don't remove the starter code"
                        }])
                    }
                } else if (!tasks.task2) {
                    let passed = true
                    for (let i = 0; i <= 10; i++) {
                        if (grid[5][i].type !== "wall") {
                            passed = false
                        }
                    }

                    if (passed) {
                        setTasks(prev => ({
                            ...prev,
                            task2: true
                        }))
                    } else {
                        setRes(prev => [...prev, {
                            passed: false,
                            message: "Please modify the loop to have a wall from (0,5) to (0, 10)"
                        }])
                    }
                } else if (!tasks.task3) {
                    let passed1 = true
                    let passed2 = true
                    for (let i = 0; i <= 10; i++) {
                        if (grid[5][i].type !== "wall") {
                            passed1 = false
                        }
                    }
                    for (let i = 0; i <= 7; i++) {
                        if (grid[i][11].type !== "wall") {
                            passed2 = false
                        }
                    }

                    if (passed1 && passed2) {
                        setTasks(prev => ({
                            ...prev,
                            task3: true
                        }))
                    } else {
                        if (!passed1) {
                            setRes(prev => [...prev, {
                                passed: false,
                                message: "You need to have a wall from (0,5) to (0, 10)"
                            }])
                        }
                        if (!passed2) {
                            setRes(prev => [...prev, {
                                passed: false,
                                message: "You need to have a wall from (11,0) to (11, 7)"
                            }])
                        }
                    }
                }
            }
            valid()
        }
    }, [lastDoneRunId, runIndex, grid])

    useEffect(() => {
        if (tasks.task1 && tasks.task2 && tasks.task3) {
            const handleEnd = () => {
                localStorage.setItem("lvl4Passed", JSON.stringify(true))
                setEnd(true)
            }
            handleEnd()
        }
    }, [tasks])

    useEffect(() => {
        workerRef.current?.terminate()
    }, [])

    return (
        <main className="p-8 flex gap-4 h-screen">
            <EndDialog
                end={end}
                url="/levels"
            />

            <section className="flex-1 overflow-y-auto pr-2 flex flex-col">
                <div className="flex items-center justify-between">
                    <Button variant={"secondary"} size={"sm"} asChild>
                        <Link href={"/levels"}><ArrowLeftIcon /> Back to menu</Link>
                    </Button>
                    <Button onClick={run}>Run Code <SquareChevronRightIcon /></Button>
                </div>
                <div className="flex-1 flex flex-col">
                    <Separator className="my-4" />
                    <div className="flex-1 flex flex-col">
                        <Editor code={code} setCode={setCode} />
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-3 gap-4">
                        <Instructions tasks={tasks} />
                        <Status res={res} error={error} />
                    </div>
                </div>
            </section>
            <section className="space-y-3">
                <GridCanvas grid={grid} cellSize={70} />
            </section>
        </main>
    );
}

export default Page;