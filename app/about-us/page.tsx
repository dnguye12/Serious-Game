import Squares from "@/components/ReactBits/Squares";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, GamepadIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
    return (
        <main className="grid grid-cols-2 gap-4 h-screen">
            <div className="flex flex-col p-8">
                <div className="flex items-center justify-between">
                    <Button variant={"secondary"} size={"sm"} asChild>
                        <Link href={"/"}><ArrowLeftIcon /> Back to menu</Link>
                    </Button>

                    <Button size={"lg"} asChild>
                        <Link href={"/levels"}>
                            <GamepadIcon /> Start game
                        </Link>
                    </Button>
                </div>
                <Separator className="my-4" />
                <div className="flex-1">
                    <p className="text-lg font-semibold text-muted-foreground mb-2">Introduction to JavaScript</p>
                    <h1 className="text-pretty text-2xl lg:text-4xl font-bold mb-6">What is JavaScript?</h1>
                    <div className="space-y-4 text-lg">
                        <p>JavaScript is one of the most popular programming languages in the world. It started as a simple language for web browsers, and in the past it had some problems and strange details. But over time it has improved a lot. Today, JavaScript is powerful, flexible, and fast. Developers use it to build modern websites, web apps, and many other kinds of software.</p>
                        <p>Because JavaScript is at the heart of web development, many people choose it as their first programming language. With JavaScript, you can make websites react to users, update the screen without reloading, and create interactive experiences.</p>
                        <p>In this lesson, you will learn basic coding ideas such as data types and built-in objects. These ideas are important for all developers and will help you understand more advanced topics later. Take your time, experiment, and use what you learn to start building your own projects - like growing your city with code.</p>
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
        </main>
    );
}

export default Page;