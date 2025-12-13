import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false })

interface EditorProps {
    code: string;
    setCode: Dispatch<SetStateAction<string>>
}
const Editor = ({ code, setCode }: EditorProps) => {
    return (
        <div className="flex-1 border rounded-xl overflow-hidden">
            <Monaco
                height="100%"
                defaultLanguage="javascript"
                value={code}
                onChange={(c) => setCode(c ?? "")}
                options={{ minimap: { enabled: false }, fontSize: 14 }}
            />
        </div>
    );
}

export default Editor;