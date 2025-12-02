// app/components/UploadCard.tsx
import { ChangeEvent } from "react";

type UploadCardProps = {
    onFileSelected: (file: File | null) => void;
    onUpload: () => void;
    isUploading: boolean;
    selectedFileName?: string;
    error?: string | null;
};

export function UploadCard({
    onFileSelected,
    onUpload,
    isUploading,
    selectedFileName,
    error,
}: UploadCardProps) {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onFileSelected(file);
    };

    return (
        <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-sky-500/5 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                Upload your legal template
            </h1>
            <p className="text-sm text-slate-400 mb-6">
                Drop in a SAFE, lease, NDA, or any legal draft. I&apos;ll analyze it,
                find the blanks, and guide you through filling them conversationally.
            </p>

            <label className="block">
                <span className="text-xs font-medium text-slate-300 mb-2 block">
                    Document (.docx)
                </span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <label className="flex-1 flex items-center justify-between gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-300 cursor-pointer hover:border-sky-500/70 hover:bg-slate-900 transition">
                        <div className="flex flex-col">
                            <span className="font-medium">
                                {selectedFileName || "Choose a .docx file"}
                            </span>
                            <span className="text-xs text-slate-500">
                                Max ~5MB • Content stays private
                            </span>
                        </div>
                        <span className="text-xs rounded-lg bg-slate-800 px-3 py-1 text-slate-300">
                            Browse
                        </span>
                        <input
                            type="file"
                            accept=".docx"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    <button
                        type="button"
                        onClick={onUpload}
                        disabled={isUploading}
                        className="inline-flex items-center justify-center rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-400 px-5 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30 transition"
                    >
                        {isUploading ? (
                            <>
                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-r-transparent" />
                                Uploading...
                            </>
                        ) : (
                            <>Upload &amp; start</>
                        )}
                    </button>
                </div>
            </label>

            {error && (
                <p className="mt-3 text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}

            <div className="mt-6 text-xs text-slate-500 space-y-1">
                <p>✅ Detects template text vs placeholders</p>
                <p>✅ Chats with you to fill each field</p>
                <p>✅ Lets you download a completed .docx</p>
            </div>
        </div>
    );
}
