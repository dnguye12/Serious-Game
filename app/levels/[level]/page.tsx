"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { level1 } from "@/lib/levels/level1";
import { Command, Grid, Result } from "@/lib/types";
import { ArrowLeftIcon, SquareCheckBigIcon, SquareChevronRightIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Instructions from "./components/Instructions";
import GridCanvas from "./components/GridCanvas";
import Editor from "./components/Editor";
import Link from "next/link";
import Status from "./components/Status";
import { level2 } from "@/lib/levels/level2";
import { level3 } from "@/lib/levels/level3";
import { level4 } from "@/lib/levels/level4";

const levels: Record<string, typeof level1> = {
  "level1": level1,
  "level2": level2,
  "level3": level3,
  "level4": level4
}

export default function Page() {
  const param = useParams<{ level: string }>()

  const lvl = levels[param.level] ?? level1
  const [code, setCode] = useState(lvl.starterCode)
  const [grid, setGrid] = useState<Grid>(() =>
    Array.from({ length: lvl.height }, () =>
      Array.from({ length: lvl.width }, () => ({ type: "empty" as const })))
  )
  const [print, setPrint] = useState<string[]>([])
  const workerRef = useRef<Worker | null>(null)
  const [res, setRes] = useState<Result[]>([])
  const [error, setError] = useState<string[]>([])
  const [runIndex, setRunIndex] = useState(0)
  const [lastDoneRunId, setLastDoneRunId] = useState<number | null>(null)
  const router = useRouter()

  const freshGrid = () =>
    Array.from({ length: lvl.height }, () =>
      Array.from({ length: lvl.width }, () => ({ type: "empty" as const }))
    );

  const run = () => {
    const id = runIndex + 1
    setRunIndex(id)
    setGrid(freshGrid())
    setPrint([])
    setError([])

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
      } else if (msg.type === "print") {
        setPrint((prev) => [...prev, msg.message]);
      } else if (msg.type === "done") {
        setLastDoneRunId(id)
      } else if (msg.type === "error") {
        setError(prev => [...prev, msg.message])
      }
    }

    workerRef.current.postMessage({
      type: "init",
      width: lvl.width,
      height: lvl.height,
      code,
      palette: lvl.palette,
      maxSteps: 100_000,
    })
  }

  const nextLevel = () => {
    if (param.level === "level1") {
      router.push("/levels/level2")
    } else if (param.level === "level2") {
      router.push("/levels/level3")
    } else if (param.level === "level3") {
      router.push("/levels/level4")
    } else {
      router.push("/levels")
    }
  }

  useEffect(() => {
    if (lastDoneRunId === runIndex) {
      const valid = async () => {
        console.log(print)
        setRes(lvl.validate(grid, print))
      }
      valid()
    }
  }, [lastDoneRunId, runIndex])

  useEffect(() => {
    workerRef.current?.terminate()
  }, [])

  useEffect(() => {
    if (res.length === 1 && res[0].passed) {
      try {
        if (param.level === "level1") {
          localStorage.setItem("lvl1Passed", JSON.stringify(true))
        } else if (param.level === "level2") {
          localStorage.setItem("lvl2Passed", JSON.stringify(true))
        } else if (param.level === "level3") {
          localStorage.setItem("lvl3Passed", JSON.stringify(true))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [res, param.level])

  return (
    <main className="p-8 flex gap-4 h-screen">
      <section className="flex-1 overflow-y-auto pr-2 flex flex-col">
        <div className="flex items-center justify-between">
          <Button variant={"secondary"} size={"sm"} asChild>
            <Link href={"/levels"}><ArrowLeftIcon /> Back to menu</Link>
          </Button>
          <div className="flex gap-2">
            <Button onClick={run}>Run Code <SquareChevronRightIcon /></Button>
            <Button onClick={nextLevel} variant={"secondary"} disabled={res.length !== 1 || !res[0].passed}>Next Level <SquareCheckBigIcon /></Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <Separator className="my-4" />
          <div className="flex-1 flex flex-col">
            <Editor code={code} setCode={setCode} />
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4">
            <Instructions lvl={lvl} />
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
