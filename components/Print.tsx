import { cn } from "@/lib/utils";

interface PrintProps {
    print: string[]
}

const Print = ({ print }: PrintProps) => {
    return (
        <div className="border rounded-xl p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Console</h2>
            <div className={cn(
                "bg-accent p-6 rounded-xl border h-full text-sm",
                print.length === 0 && "text-muted-foreground italic"
            )}>
                {
                    print.length === 0
                        ?
                        "//All your print messages will display here"
                        :
                        (
                            print.map((p, idx) => (
                                <p key={`print-${idx}`}>{p}</p>
                            ))
                        )
                }
            </div>
        </div>
    );
}

export default Print;