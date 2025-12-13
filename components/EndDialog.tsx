"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface EndDialogProps {
    end: boolean;
    url: string;
}

const EndDialog = ({ end, url }: EndDialogProps) => {
    const router = useRouter()

    return (
        <Dialog open={end}>
            <DialogContent className=" max-w-sm!">
                <DialogHeader className="text-lg font-semibold">Level complete</DialogHeader>
                <DialogDescription>
                    <p>You have successfully complete this level.</p>
                    <p>You can move to the next level!</p>
                </DialogDescription>
                <DialogFooter>
                    <Button size={"lg"} onClick={() => { router.push(url) }} className="w-full">Next Level</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EndDialog;