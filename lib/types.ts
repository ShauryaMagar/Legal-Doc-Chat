// lib/types.ts
// simgle source of truth for shared types between frontend and backend
export type SessionStatus = {
    status: "analyzing" | "ready" | "completed";
    completedFields: number; //the # of placeholders filled so far
    totalFields: number; //the total # of placeholders found in the document
    documentTitle?: string; //original filename of the uploaded document
};
//This is the high-level state of a document session.
//Talks about where the document is in its lifecycle and progress
//status: can be either of the 3 values. "analyzing": doc being parsed, "ready": chat is asking for answers, or "completed": all placeholders filled. Doc ready for download
// used in chat window and session page

export type MessageSender = "user" | "assistant";
// who sent the message: user or assistant ai

// one chat bubble message
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
// Equivalent to
// type SessionStatusResponse = {
//     status: "analyzing" | "ready" | "completed";
//     completedFields: number;
//     totalFields: number;
//     documentTitle?: string;
//     messages: Message[];
// };
