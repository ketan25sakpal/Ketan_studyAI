'use client'

import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
    title?: string;
    progress?: { label: string; completed: boolean }[];
}

const LoadingOverlay = ({ 
    title = "Synthesizing Your Book...", 
    progress = [
        { label: "Analyzing PDF content", completed: true },
        { label: "Generating audio narrative", completed: false },
        { label: "Finalizing assistant voice", completed: false }
    ] 
}: LoadingOverlayProps) => {
    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper bg-white">
                <div className="loading-shadow" role="status" aria-live="polite" aria-atomic="true">
                    <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
                    <h2 className="loading-title">{title}</h2>
                    
                    <ul className="loading-progress" role="list" aria-live="polite">
                        {progress.map((item, index) => (
                            <li key={index} className="loading-progress-item">
                                {item.completed && <div className="loading-progress-status" />}
                                <span className={item.completed ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-muted)]"}>
                                    {item.label} — {item.completed ? "completed" : "in progress"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
