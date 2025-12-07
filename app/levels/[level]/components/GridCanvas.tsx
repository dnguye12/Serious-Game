"use client"

import { Grid } from "@/lib/types";
import { useEffect, useRef } from "react";

interface GridCanvasProps {
    grid: Grid;
    cellSize?: number
}

const GridCanvas = ({ grid, cellSize = 32 }: GridCanvasProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = ref.current!
        const ctx = canvas.getContext("2d")!
        const cols = grid[0].length;
        const rows = grid.length;
        const cssWidth = cols * cellSize;
        const cssHeight = rows * cellSize;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = cssWidth * dpr;
        canvas.height = cssHeight * dpr;
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, cssWidth, cssHeight);

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                const type = grid[y][x].type;

                if (type === "empty") ctx.fillStyle = "#f8fafc";
                else if (type === "wall") ctx.fillStyle = "#1f2937";
                else if (type === "park") ctx.fillStyle = "#22c55e";
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

                ctx.strokeStyle = "#e5e7eb";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }, [grid, cellSize])

    return (
        <canvas ref={ref} className="rounded-xl shadow block w-full" />
    );
}

export default GridCanvas;