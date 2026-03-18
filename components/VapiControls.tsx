'use client';

import React, {useEffect} from "react";
import Image from "next/image";
import { Mic, MicOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { IBook } from "@/types";
import { useVapi } from "@/hooks/useVapi";
import Transcript from "@/components/Transcript";

const VapiControls = ({ book }: { book: IBook }) => {

    const router = useRouter();
    const {
        status,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        maxDuration,
        volumeLevel,
        isActive,
        start,
        stop,
        limitError,
        isBillingError,
        clearError,
    } = useVapi(book);

    useEffect(() => {
        if (isBillingError) {
            router.push('/subscriptions');
        }
    }, [isBillingError, router]);

    useEffect(() => {
        if (limitError === 'Session limit reached. Redirecting...') {
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [limitError, router]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col gap-10">

            {/* Error Message */}
            {limitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
                    <span className="block sm:inline">{limitError}</span>
                    <button
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={clearError}
                    >
                        <span className="sr-only">Close</span>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </button>
                </div>
            )}

            {/* Header Card */}
            <div className="vapi-header-card">
                <div className="vapi-cover-wrapper">
                    <Image
                        src={book.coverURL || "/images/book-placeholder.png"}
                        alt={book.title}
                        width={150}
                        height={210}
                        className="vapi-cover-image"
                    />

                    <div className="vapi-mic-wrapper">
                        {(status === 'speaking' || status === 'thinking') && (
                            <div
                                className="vapi-pulse-ring"
                            />
                        )}
                        <button
                            onClick={isActive ? stop : start}
                            disabled={status === 'connecting'}
                            aria-label={isActive ? "stop voice assistant" : "start voice assistant"}
                            title={isActive ? "Stop Voice Assistant" : "Start Voice Assistant"}
                            className="vapi-mic-btn"
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
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#212a3b] mb-1">
                            {book.title}
                        </h1>
                        <p className="text-xl text-[#3d485e] font-medium">
                            by {book.author}
                        </p>
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap gap-4 mt-1">
                        <div className="vapi-status-indicator">
                            <span className={`vapi-status-dot vapi-status-dot-${status}`} />
                            <span className="vapi-status-text capitalize">{status}</span>
                        </div>

                        <div className="vapi-status-indicator">
                            <span className="vapi-status-text">
                                Voice: <span className="font-bold ml-1">{book.persona || "Default"}</span>
                            </span>
                        </div>

                        <div className="vapi-status-indicator">
                            <span className="vapi-status-text">
                                {formatTime(duration)}/{formatTime(maxDuration)}
                            </span>
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