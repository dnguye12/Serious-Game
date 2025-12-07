import Squares from "@/components/ReactBits/Squares";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GamepadIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";

const Home = () => {
    return (
        <div className="h-screen grid grid-cols-2">
            <div className="flex flex-col justify-between p-8 mx-auto w-full">
                <div className="flex-1 flex flex-col justify-center max-w-2xl">
                    <div className="flex flex-col gap-6 md:gap-8">
                        <Badge className="-mb-3">Serious Game</Badge>
                        <h1 className=" text-pretty text-4xl lg:text-6xl font-bold ">Learn how to <span className="text-sky-400">code</span> by <span className="text-emerald-400">building</span> <span className="text-amber-400">a</span> <span className="text-rose-400">city</span>.</h1>
                        <p className="lg:text-lg text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.</p>
                        <div className="flex items-center gap-4">
                            <Button size={"lg"} asChild>
                                <Link href={"/levels"}>
                                    <GamepadIcon /> Start Game
                                </Link>
                            </Button>
                            <Button size={"lg"} variant={"secondary"}><UserRoundIcon /> About Us</Button>
                        </div>
                    </div>
                </div>
                <div className="flex items-end">
                    <div className="flex flex-col text-sm text-muted-foreground">
                        <p>Created by Nguyen Duc Huy and Baptiste Samoyault</p>
                        <p>Project for Serious Game - Human Computer Interaction Master, University Paris Saclay</p>
                    </div>
                </div>
            </div>
            <div className="relative border-l">
                <Squares
                    speed={0.5}
                    squareSize={48}
                    direction='diagonal' // up, down, left, right, diagonal
                    borderColor='oklch(0.92 0.004 286.32)'
                    hoverFillColor='oklch(0.141 0.005 285.823)'
                />
                <div className="absolute z-0 top-0 left-0 w-full h-full bg-secondary-background"></div>
            </div>
        </div>
    );
}

export default Home;