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
        task3: boolean;
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
            <h1 className="text-lg font-semibold mb-2">Level 4 - Repeating Yourself Less</h1>
            <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
                <CarouselContent>
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                <p>You just spent time typing many similar lines.</p>
                                <p>Loops let you say <span className="font-semibold">“do this many times”</span> instead.</p>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                <p>Let&apos;s take a look at the starter code</p>
                                <p className="font-semibold">{"for (var x = 0; x <= 5; x = x + 1)"}</p>
                                <p>Start <span className="font-semibold">x</span> at 0</p>
                                <p>Keep going while <span className="font-semibold">x</span> is less or equal than 5</p>
                                <p>After each run, add 1 to <span className="font-semibold">x</span></p>
                                <p>Inside the loop, we draw a building at (x, 3)</p>
                                <p>Stop when <span className="font-semibold">x</span> is greater than 5</p>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="bg-accent">
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
                        <Card className="bg-accent">
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
                                                <p>Change the loop condition to make a wall from x=0 to x=10</p>
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
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                {tasks.task2
                                    ?
                                    (
                                        <Alert className="bg-transparent" variant={tasks.task3 ? "success" : "default"}>
                                            {
                                                tasks.task3 ?
                                                    <SquareCheckBigIcon />
                                                    :
                                                    <SquareIcon />
                                            }
                                            <AlertTitle>Task 3</AlertTitle>
                                            <AlertDescription>
                                                <p>Add another loop below</p>
                                                <p>Make the loop for y instead.</p>
                                                <p>Make a wall from (11,0) to (11,7)</p>
                                            </AlertDescription>
                                        </Alert>
                                    )
                                    :
                                    (
                                        <Alert className="bg-transparent" variant={"destructive"}>
                                            <AlertCircleIcon />
                                            <AlertTitle>Task 3</AlertTitle>
                                            <AlertDescription>
                                                <p>Please finish task 2 first before working on task 3.</p>
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