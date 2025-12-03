// app/session/[sessionId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChatWindow } from "../../components/ChatWindow";
import {
    getSessionStatus,
    sendChatMessage,
    getDownloadUrl,
} from "../../../lib/apiClient";
import { Message, SessionStatusResponse } from "../../../lib/types";

export default function SessionPage() {
    const params = useParams();
    const sessionId = params?.sessionId as string | undefined;

    const [status, setStatus] = useState<SessionStatusResponse | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initial load: get status + existing messages
    useEffect(() => {
        if (!sessionId) return;

        const fetchStatus = async () => {
            try {
                setInitialLoading(true);
                const res = await getSessionStatus(sessionId);
                setStatus(res);
                setMessages(res.messages || []);
            } catch (err) {
                console.error(err);
                setError("Could not load this session. Please try again.");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchStatus();
    }, [sessionId]);

    // Optional: when status becomes "ready" and we have no messages,
    // you could send an "__INIT__" message to get an opening assistant message.
    useEffect(() => {
        const maybeInit = async () => {
            if (!sessionId || !status) return;
            if (status.status === "ready" && messages.length === 0) {
                try {
                    setIsSending(true);
                    const { reply, sessionStatus } = await sendChatMessage(
                        sessionId,
                        "__INIT__"
                    );
                    setMessages((prev) => [...prev, reply]);
                    setStatus(sessionStatus);
                } catch (err) {
                    console.error(err);
                    setError("Failed to start the conversation.");
                } finally {
                    setIsSending(false);
                }
            }
        };
        // Fire and forget
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        maybeInit();
        // we intentionally only look at messages.length === 0 to avoid loops
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status?.status, sessionId]);

    const handleSend = async (text: string) => {
        if (!sessionId) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            sender: "user",
            text,
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsSending(true);
        setError(null);

        try {
            const { reply, sessionStatus } = await sendChatMessage(sessionId, text);
            setMessages((prev) => [...prev, reply]);
            setStatus(sessionStatus);
        } catch (err) {
            console.error(err);
            setError("Something went wrong while sending your message.");
        } finally {
            setIsSending(false);
        }
    };

    if (!sessionId) {
        return (
            <div className="flex items-center justify-center px-4 py-10">
                <p className="text-sm text-slate-400">
                    Missing session ID in the URL.
                </p>
            </div>
        );
    }

    if (initialLoading || !status) {
        return (
            <div className="flex items-center justify-center px-4 py-10">
                <div className="flex flex-col items-center gap-3">
                    <span className="h-6 w-6 rounded-full border-2 border-sky-400 border-r-transparent animate-spin" />
                    <p className="text-sm text-slate-400">
                        Loading your document session...
                    </p>
                </div>
            </div>
        );
    }

    const downloadUrl = getDownloadUrl(sessionId);

    return (
        <div className="px-4 py-6 sm:py-8">
            <div className="mx-auto max-w-5xl flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                            Document session
                        </h1>
                        <p className="text-xs text-slate-400">
                            Session ID:{" "}
                            <span className="font-mono text-slate-300">{sessionId}</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${status.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                                    : status.status === "ready"
                                        ? "bg-sky-500/10 text-sky-300 border border-sky-500/40"
                                        : "bg-amber-500/10 text-amber-300 border border-amber-500/40"
                                }`}
                        >
                            {status.status === "completed"
                                ? "All fields completed"
                                : status.status === "ready"
                                    ? "Ready for input"
                                    : "Analyzing"}
                        </span>

                        {status.status === "completed" && (
                            <a
                                href={downloadUrl}
                                className="inline-flex items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/30 transition"
                            >
                                Download completed document
                            </a>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-800/60 bg-red-950/40 px-3 py-2 text-xs text-red-300">
                        {error}
                    </div>
                )}

                <div className="h-[70vh] sm:h-[75vh]">
                    <ChatWindow
                        messages={messages}
                        onSend={handleSend}
                        isSending={isSending}
                        status={status.status}
                        completedFields={status.completedFields}
                        totalFields={status.totalFields}
                        documentTitle={status.documentTitle}
                    />
                </div>
            </div>
        </div>
    );
}
