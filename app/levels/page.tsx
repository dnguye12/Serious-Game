import Squares from "@/components/ReactBits/Squares";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BuildingIcon, DoorOpenIcon, EqualIcon, PrinterIcon, RefreshCcwIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <div className="h-screen relative overflow-hidden">
            <div className="absolute container max-w-5xl z-20 bg-white border rounded-xl top-1/2 left-1/2 -translate-1/2 p-8">
                <h1 className=" text-pretty text-2xl lg:text-4xl font-bold text-center mb-6">Select Level</h1>
                <div className="grid grid-cols-2 grid-rows-3 gap-6">
                    <Link href={"/levels/level1"} className="menu-item bg-sky-400 hover:bg-sky-500">
                        <div className="flex items-center gap-3">
                            <PrinterIcon className="text-primary-foreground" />
                            <h5>Level 1 - Hello World</h5>
                        </div>
                        <p>Learn how to print your first message to welcome all your new citizens.</p>
                    </Link>

                    <Link href={"/levels/level2"} className="menu-item bg-emerald-400 hover:bg-emerald-500">
                        <div className="flex items-center gap-3">
                            <BuildingIcon className="text-primary-foreground" />
                            <h5>Level 2 - First Building</h5>
                        </div>
                        <p>Call the place() function to put down your first building in the city.</p>
                    </Link>

                    <Link href={"/levels/level3"} className="menu-item bg-amber-400 hover:bg-amber-500">
                        <div className="flex items-center gap-3">
                            <RefreshCcwIcon className="text-primary-foreground" />
                            <h5>Level 3 - First Loop</h5>
                        </div>
                        <p>Use a loop to build a full wall with just a few lines of code.</p>
                    </Link>

                    <Link href={"/levels/level4"} className="menu-item bg-rose-400 hover:bg-rose-500">
                        <div className="flex items-center gap-3">
                            <EqualIcon className="text-primary-foreground" />
                            <h5>Level 4 - Conditions</h5>
                        </div>
                        <p>Combine loops and conditionals to create a magic.</p>
                    </Link>
                    
                    <Skeleton className="flex flex-col rounded-lg p-6 md:p-8 justify-center items-center border">
                        <p className=" italic text-muted-foreground text-xl">More coming soon...</p>
                    </Skeleton>

                    <Button variant={"ghost"} className="h-full rounded-lg" size={"lg"} asChild>
                        <Link href={"/"} className="text-xl"><DoorOpenIcon/> Back to menu</Link>
                    </Button>
                </div>
            </div>
            <div className="absolute z-0 w-full h-full pointer-events-none opacity-50">
                <Squares
                    speed={0.5}
                    squareSize={48}
                    direction='diagonal' // up, down, left, right, diagonal
                    borderColor='oklch(0.92 0.004 286.32)'
                    hoverFillColor='oklch(0.141 0.005 285.823)'
                />
            </div>
        </div>
    );
}

export default Page;