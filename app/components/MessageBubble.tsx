// app/components/MessageBubble.tsx
import { Message } from "../../lib/types";

type MessageBubbleProps = {
    message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.sender === "user";

    return (
        <div
            className={`flex w-full ${isUser ? "justify-end" : "justify-start"
                } mb-3`}
        >
            <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-lg ${isUser
                        ? "bg-sky-500 text-slate-950 rounded-br-sm"
                        : "bg-slate-800/80 text-slate-50 rounded-bl-sm border border-slate-700/80"
                    }`}
            >
                <p>{message.text}</p>
                <span className="mt-1 block text-[10px] text-slate-300/70">
                    {isUser ? "You" : "Assistant"}
                </span>
            </div>
        </div>
    );
}
