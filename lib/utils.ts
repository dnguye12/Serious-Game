import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scoreCode = (code: string) => {
  const lines = code.split("\n").map(l => l.trim()).filter(l => l && !l.startsWith("//"))
  const nbPlaceCalls = lines.filter(l => l.includes("place(")).length
  let hasLoop = false
  let hasPrint = false
  for (const line of lines) {
    if (line.includes("for(") || line.includes("while(")) {
      hasLoop = true
    }
    if(line.includes("print(")) {
      hasPrint = true
    }
  }

  return {
    numLines: lines.length,
    nbPlaceCalls,
    hasLoop,
    hasPrint
  }
}