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
    var x1 = 3
    var y1 = 6

    place(x1, y1, "wall")
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
                    if (grid[6][3].type === "wall") {
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
                    if (grid[6][3].type === "wall") {
                        setRes(prev => [...prev, {
                            passed: false,
                            message: "Please modify x1 and y1 to move the wall to (10,3)"
                        }])
                    } else {
                        if (grid[3][10].type === "wall") {
                            setTasks(prev => ({
                                ...prev,
                                task2: true
                            }))
                        } else {
                            setRes(prev => [...prev, {
                                passed: false,
                                message: "Please modify x1 and y1 to move the wall to (10,3)"
                            }])
                        }
                    }
                } else if (!tasks.task3) {
                    if (!code.includes("x2") || !code.includes("y2")) {
                        setRes(prev => [...prev, {
                            passed: false,
                            message: "You need 2 new variables x2 and y2."
                        }])
                    } else {
                        if (grid[3][10].type === "wall" && grid[2][2].type === "wall") {
                            setTasks(prev => ({
                                ...prev,
                                task3: true
                            }))
                        } else {
                            setRes(prev => [...prev, {
                                passed: false,
                                message: "You need 2 walls at (10,3) (2,2)"
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
                localStorage.setItem("lvl3Passed", JSON.stringify(true))
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
                url="/game/level4"
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