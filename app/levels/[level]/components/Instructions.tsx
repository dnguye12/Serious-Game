import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Level } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface InstructionsProps {
    lvl: Level
}

const Instructions = ({ lvl }: InstructionsProps) => {
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
            <h1 className="text-lg font-semibold mb-2">{lvl.name}</h1>
            <Carousel setApi={setApi} className="w-full" opts={{watchDrag: false}}>
                <CarouselContent>
                    {lvl.slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <Card className="bg-accent">
                                <CardContent>
                                    <p className=" whitespace-pre-line">{slide}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                    <CarouselItem>
                        <Card className="bg-accent">
                            <CardContent>
                                <p className=" font-semibold text-lg">Task instructions :</p>
                                <ul className=" list-disc list-inside">
                                    {lvl.tasks.map((task, idx) => (
                                        <li>{task}</li>
                                    ))}
                                </ul>
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