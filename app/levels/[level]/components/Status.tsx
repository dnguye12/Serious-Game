import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Result } from "@/lib/types";
import { CircleAlertIcon } from "lucide-react";

interface StatusProps {
    res: Result[];
    error: string[]
}

const Status = ({ res, error }: StatusProps) => {
    return (
        <div className="border rounded-xl p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            {
                res.length === 0 && error.length === 0 && (
                    <p className="italic text-muted-foreground">Code result will be displayed here.</p>
                )
            }
            <div className="flex flex-col gap-2">
                {
                    res.map((r, idx) => (
                        <Alert key={`res-${idx}`} variant={r.passed ? "success" : "destructive"}>
                            {
                                r.passed ? <CircleAlertIcon /> : <CircleAlertIcon />
                            }
                            <AlertTitle>{r.passed ? "Solution passed!" : "Solution not passed!"}</AlertTitle>
                            <AlertDescription>{r.message}</AlertDescription>
                        </Alert>
                    ))
                }
                {
                    error.map((err, idx) => (
                        <Alert key={`error-${idx}`} variant={"destructive"}>
                            <CircleAlertIcon />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{err}</AlertDescription>
                        </Alert>
                    ))
                }
            </div>
        </div>
    );
}

export default Status;