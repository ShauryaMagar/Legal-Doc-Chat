// lib/types.ts
export type SessionStatus = {
    status: "analyzing" | "ready" | "completed";
    completedFields: number;
    totalFields: number;
    documentTitle?: string;
};

export type MessageSender = "user" | "assistant";

export type Message = {
    id: string;
    sender: MessageSender;
    text: string;
    createdAt: string;
};

// What we expect from GET /api/session/:sessionId/status
export type SessionStatusResponse = SessionStatus & {
    messages: Message[];
};
