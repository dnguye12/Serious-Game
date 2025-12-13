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
            <h1 className="text-lg font-semibold mb-2">Level 3 - Remembering a Spot</h1>
            <Carousel setApi={setApi} className="w-full" opts={{ watchDrag: false }}>
                <CarouselContent>
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                <p>Typing the same number again and again is annoying.
                                    Instead, we can give a name to a position and reuse it.</p>
                                <p>This name is called a <span className="font-semibold">variable</span>.</p>
                                <p>You create one with <span className="font-semibold underline">var</span> + &quot;<i>name of the variable</i>&quot;</p>
                                <p><span className="font-semibold">var x1</span> for example</p>
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
                                                <p>Change x1 and y1 to move the wall to (10,3)</p>
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
                                                <p>Add a new pair of variables: x2 and y2</p>
                                                <p>Use these positions to place another new wall at (2,2).</p>
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