// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCard } from "./components/UploadCard";
import { uploadDocument } from "../lib/apiClient";

export default function HomePage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(
    undefined
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    setSelectedFileName(file?.name);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please choose a .docx file first.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      const { sessionId } = await uploadDocument(selectedFile);
      router.push(`/session/${encodeURIComponent(sessionId)}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-5xl w-full grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <div className="space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            AI-assisted legal drafting
          </h2>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Turn any legal template into a{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              guided conversation
            </span>
            .
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Upload a legal draft like a SAFE, lease, or NDA. The assistant will
            parse it, identify blanks, explain legal jargon in simple English,
            and walk you through every field until your document is ready to
            download.
          </p>

          <div className="hidden lg:block text-xs text-slate-500 space-y-1">
            <p>• Responsive UI that works on laptop, tablet, and phone</p>
            <p>• Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
        </div>

        <UploadCard
          onFileSelected={handleFileSelected}
          onUpload={handleUpload}
          isUploading={isUploading}
          selectedFileName={selectedFileName}
          error={error}
        />
      </div>
    </div>
  );
}
