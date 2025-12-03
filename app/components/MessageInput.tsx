// app/components/MessageInput.tsx
import { FormEvent, useState } from "react";

type MessageInputProps = {
    onSend: (text: string) => Promise<void> | void;
    disabled?: boolean;
};

export function MessageInput({ onSend, disabled }: MessageInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!value.trim() || disabled) return;
        const text = value.trim();
        setValue("");
        await onSend(text);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2"
        >
            <textarea
                className="flex-1 resize-none bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500 max-h-32 min-h-[40px] py-1"
                placeholder="Ask a question or answer the current field..."
                value={value}
                disabled={disabled}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                type="submit"
                disabled={disabled}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-slate-950 text-sm font-medium shadow-lg shadow-sky-500/30 disabled:bg-slate-700 disabled:text-slate-400 transition hover:bg-sky-400"
            >
                ➤
            </button>
        </form>
    );
}
