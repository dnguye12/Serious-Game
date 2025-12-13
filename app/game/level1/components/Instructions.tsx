import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, SquareCheckBigIcon, SquareIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface InstructionsProps {
    tasks: {
        task1: boolean;
        task2: boolean;
    }
}

const Instructions = ({ tasks }: InstructionsProps) => {
    const [api, setApi] = useState<CarouselApi>()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [countSlide, setCountSlide] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        const slideInit = async () => {
            setCountSlide(api.scrollSnapList().length)
            setCurrentSlide(api.selectedScrollSnap() + 1)

            api.on("select", () => {
                setCurrentSlide(api.selectedScrollSnap() + 1)
            })
        }

        slideInit()
    }, [api])

    return (
        <div className="col-span-2 p-6 border rounded-xl">
            <h1 className="text-lg font-semibold mb-2">Level 1 - Code to Build</h1>
            <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
                <CarouselContent>
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                <p>Welcome, Mayor!</p>
                                <p>This empty land will become your city.</p>
                                <b className=" font-semibold">Click on the arrows to move to the next slide</b>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                <p>The console on top allows you to give instructions for the computer.</p>
                                <p>When you press Run, the computer follows those instructions to build your city on the grid.</p>
                                <b className=" font-semibold">Continue to see the task for this level.</b>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="bg-accent h-full">
                            <CardContent>
                                <Alert variant={"destructive"} className="bg-transparent">
                                    <AlertCircleIcon />
                                    <AlertTitle>Read the task carefully</AlertTitle>
                                    <AlertDescription>
                                        <p>Please follow and finish the task one by one.</p>
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="bg-accent h-full">
                            <CardContent>
                                <Alert className="bg-transparent" variant={tasks.task1 ? "success" : "default"}>
                                    {
                                        tasks.task1 ?
                                            <SquareCheckBigIcon />
                                            :
                                            <SquareIcon />
                                    }
                                    <AlertTitle>Task 1</AlertTitle>
                                    <AlertDescription>
                                        <p>Press &quot;Run Code&quot; once and watch what happens.</p>
                                        <i>You do not need to edit anything in this task.</i>
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="bg-accent h-full">
                            <CardContent>
                                {tasks.task1
                                    ?
                                    (
                                        <Alert className="bg-transparent" variant={tasks.task2 ? "success" : "default"}>
                                            {
                                                tasks.task2 ?
                                                    <SquareCheckBigIcon />
                                                    :
                                                    <SquareIcon />
                                            }
                                            <AlertTitle>Task 2</AlertTitle>
                                            <AlertDescription>
                                                <p>Try placing this wall in another position.</p>
                                                <p>Run Code again to see your change.</p>
                                                <p>Hint: <i>Change the 2 numbers in the place() function.</i></p>
                                            </AlertDescription>
                                        </Alert>
                                    )
                                    :
                                    (
                                        <Alert className="bg-transparent" variant={"destructive"}>
                                            <AlertCircleIcon />
                                            <AlertTitle>Task 2</AlertTitle>
                                            <AlertDescription>
                                                <p>Please finish task 1 first before working on task 2.</p>
                                            </AlertDescription>
                                        </Alert>
                                    )
                                }

                            </CardContent>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0" />
                <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" />
            </Carousel>
            <div className="mt-4 flex items-center justify-end gap-2">
                {Array.from({ length: countSlide }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn("h-3.5 w-3.5 rounded-full border-2", {
                            "border-primary": currentSlide === index + 1,
                        })}
                    />
                ))}
            </div>
        </div>
    );
}

export default Instructions;