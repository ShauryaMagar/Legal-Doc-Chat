// app/components/ProgressBar.tsx
type ProgressBarProps = {
    completed: number;
    total: number;
};

export function ProgressBar({ completed, total }: ProgressBarProps) {
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="w-full space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
                <span>
                    Fields completed: {completed}/{total || "?"}
                </span>
                <span>{percent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 transition-all duration-300"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
