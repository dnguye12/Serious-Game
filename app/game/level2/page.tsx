"use client"

import Editor from "@/app/levels/[level]/components/Editor";
import GridCanvas from "@/app/levels/[level]/components/GridCanvas";
import Status from "@/app/levels/[level]/components/Status";
import EndDialog from "@/components/EndDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Command, Grid, Result } from "@/lib/types";
import { ArrowLeftIcon, SquareChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Instructions from "./components/Instructions";

const Page = () => {
    const [grid, setGrid] = useState<Grid>(() =>
        Array.from({ length: 12 }, () =>
            Array.from({ length: 12 }, () => ({ type: "empty" as const })))
    )
    const [res, setRes] = useState<Result[]>([])
    const [code, setCode] = useState((`
        //Starter code
        place(0, 5, "wall")
        place(1, 5, "wall")
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
            console.log(grid)
            const valid = async () => {
                if (!tasks.task1) {
                    if (grid[5][0].type === "wall" && grid[5][1].type === "wall") {
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
                    if (grid[5][0].type === "wall" && grid[5][1].type === "wall" && grid[5][2].type === "wall") {
                        setTasks(prev => ({
                            ...prev,
                            task2: true
                        }))
                    } else {
                        setRes(prev => [...prev, {
                            passed: false,
                            message: "You need 3 walls at (0,5) (1,5) (2,5)"
                        }])
                    }
                } else if (!tasks.task3) {
                    if (grid[5][0].type === "wall" && grid[5][1].type === "wall" && grid[5][2].type === "wall" && grid[5][3].type === "wall" && grid[5][4].type === "wall" && grid[5][5].type === "wall") {
                        setTasks(prev => ({
                            ...prev,
                            task3: true
                        }))
                    } else {
                        setRes(prev => [...prev, {
                            passed: false,
                            message: "You need 6 walls at (0,5) (1,5) (2,5) (3,5) (4,5) (5,5)"
                        }])
                    }
                }
            }
            valid()
        }
    }, [lastDoneRunId, runIndex, grid])

    useEffect(() => {
        if (tasks.task1 && tasks.task2 && tasks.task3) {
            const handleEnd = () => {
                localStorage.setItem("lvl2Passed", JSON.stringify(true))
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
                url="/game/level3"
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