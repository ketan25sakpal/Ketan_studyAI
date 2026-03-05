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
                <div className="loading-shadow">
                    <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
                    <h2 className="loading-title">{title}</h2>
                    
                    <div className="loading-progress">
                        {progress.map((item, index) => (
                            <div key={index} className="loading-progress-item">
                                {item.completed && <div className="loading-progress-status" />}
                                <span className={item.completed ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-muted)]"}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
