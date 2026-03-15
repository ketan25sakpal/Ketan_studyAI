'use client';

import React from "react";
import Image from "next/image";
import { Mic, MicOff } from "lucide-react";

import { IBook } from "@/types";
import { useVapi } from "@/hooks/useVapi";
import Transcript from "@/components/Transcript";

const VapiControls = ({ book }: { book: IBook }) => {

    const {
        status,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        volumeLevel,
        isActive,
        start,
        stop,
        clearErrors,
    } = useVapi(book);

    return (
        <div className="flex flex-col gap-8">

            {/* Header Card */}
            <div className="vapi-header-card">
                <div className="vapi-cover-wrapper">
                    <Image
                        src={book.coverURL || "/images/book-placeholder.png"}
                        alt={book.title}
                        width={120}
                        height={180}
                        className="vapi-cover-image"
                    />

                    <div className="vapi-mic-wrapper">
                        {(status === 'speaking' || status === 'thinking') && (
                            <div
                                className="vapi-pulse-ring"
                                style={{
                                    transform: `scale(${1 + volumeLevel * 2})`,
                                    opacity: 0.3 + volumeLevel,
                                }}
                            />
                        )}
                        <button
                            onClick={isActive ? stop : start}
                            disabled={status === 'connecting'}
                            className={`vapi-mic-btn ${isActive ? 'vapi-mic-btn-active' : 'vapi-mic-btn-inactive'}`}
                        >
                            {isActive ? (
                                <Mic className="size-6 text-[#212a3b]" />
                            ) : (
                                <MicOff className="size-6 text-[#212a3b]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Book Info */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#212a3b]">
                            {book.title}
                        </h1>
                        <p className="text-[#3d485e] font-medium">
                            by {book.author}
                        </p>
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        <div className="vapi-status-indicator">
                            <span className={`vapi-status-dot vapi-status-dot-${status}`} />
                            <span className="vapi-status-text capitalize">{status}</span>
                        </div>

                        <div className="vapi-status-indicator">
                            <span className="vapi-status-text">
                                Voice: {book.persona || "Default"}
                            </span>
                        </div>

                        <div className="vapi-status-indicator">
                            <span className="vapi-status-text">0:00/15:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transcript Area */}
            <div className="vapi-transcript-wrapper">
                <Transcript
                    messages={messages}
                    currentMessage={currentMessage}
                    currentUserMessage={currentUserMessage}
                />
            </div>

        </div>
    );
};

export default VapiControls;


//2:37:45