// app/components/ChatWindow.tsx
import { useEffect, useRef } from "react";
import { Message } from "../../lib/types";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ProgressBar } from "./ProgressBar";

type ChatWindowProps = {
    messages: Message[];
    onSend: (text: string) => Promise<void>;
    isSending: boolean;
    status: "analyzing" | "ready" | "completed";
    completedFields: number;
    totalFields: number;
    documentTitle?: string;
};

export function ChatWindow({
    messages,
    onSend,
    isSending,
    status,
    completedFields,
    totalFields,
    documentTitle,
}: ChatWindowProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
            <div className="border-b border-slate-800 px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold text-slate-50">
                        Conversation for{" "}
                        <span className="text-sky-300">
                            {documentTitle || "uploaded document"}
                        </span>
                    </h2>
                    <p className="text-xs text-slate-400">
                        I&apos;ll ask for each missing field and explain legal terms in
                        simple language when needed.
                    </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:min-w-[180px]">
                    <ProgressBar completed={completedFields} total={totalFields} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                {status === "analyzing" && messages.length === 0 && (
                    <div className="flex items-center gap-3 text-sm text-slate-400 mt-4">
                        <span className="h-3 w-3 rounded-full border-2 border-sky-400 border-r-transparent animate-spin" />
                        Analyzing your document and finding placeholders...
                    </div>
                )}

                {messages.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                ))}

                <div ref={bottomRef} />
            </div>

            <div className="border-t border-slate-800 px-3 py-2 bg-slate-950/70">
                <MessageInput
                    onSend={onSend}
                    disabled={isSending || status === "analyzing"}
                />
                <p className="mt-1 text-[10px] text-slate-500">
                    Tip: You can always ask &quot;What does this term mean?&quot; if
                    something is unclear.
                </p>
            </div>
        </div>
    );
}
