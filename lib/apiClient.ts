// lib/apiClient.ts
import { Message, SessionStatusResponse } from "./types";

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? ""; // same origin by default

export async function uploadDocument(file: File): Promise<{ sessionId: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/api/upload-document`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Failed to upload document");
    }

    return res.json();
}

export async function getSessionStatus(
    sessionId: string
): Promise<SessionStatusResponse> {
    const res = await fetch(
        `${BASE_URL}/api/session/${encodeURIComponent(sessionId)}/status`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch session status");
    }

    return res.json();
}

export async function sendChatMessage(
    sessionId: string,
    message: string
): Promise<{ reply: Message; sessionStatus: SessionStatusResponse }> {
    const res = await fetch(
        `${BASE_URL}/api/session/${encodeURIComponent(sessionId)}/chat`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to send message");
    }

    return res.json();
}

export function getDownloadUrl(sessionId: string): string {
    return `${BASE_URL}/api/session/${encodeURIComponent(sessionId)}/download`;
}
