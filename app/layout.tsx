// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal Document Assistant",
  description: "Upload a legal template and fill it conversationally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-950 text-slate-100">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-400" />
                <span className="font-semibold tracking-tight">
                  LegalDoc AI
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Draft. Clarify. Download.
              </span>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-slate-900">
            <div className="mx-auto max-w-5xl px-4 py-3 text-xs text-slate-500 flex justify-between gap-2">
              <span>Built with Next.js & TypeScript</span>
              <span>For demo use only — not legal advice</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
