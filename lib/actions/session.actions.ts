'use server';

import {EndSessionResult, StartSessionResult} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import VoiceSession from "@/database/models/voice-session.model";
import {getCurrentBillingPeriodStart} from "@/lib/subscription-constants";
import {getUserPlanServer} from "@/lib/subscription-utils";

// @ts-ignore
export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        await connectToDatabase();

        const plan = await getUserPlanServer();
        const billingPeriodStart = getCurrentBillingPeriodStart();

        // Check monthly session limits
        const sessionCount = await VoiceSession.countDocuments({
            clerkId,
            billingPeriodStart,
        });

        if (sessionCount >= plan.maxSessionsPerMonth) {
            return {
                success: false,
                error: `You have reached the monthly session limit for your ${plan.slug} plan (${plan.maxSessionsPerMonth} sessions). Please upgrade to continue.`,
                isBillingError: true,
            };
        }

        const session = await VoiceSession.create({
            clerkId, bookId, startedAt: new Date(),
            billingPeriodStart,
            durationSeconds: 0,
        });

        return {
            success: true,
            sessionId: session._id.toString(),
            maxDurationMinutes: plan.maxMinPerSession,
        }
    } catch (e) {
        console.error('Error starting voice session', e);
        return { success: false, error: 'Failed to start voice session. Please try again later.' }
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        await connectToDatabase();

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds: durationSeconds,
        });

        if (!result) return{ success: false, error: 'Voice session not found.'}

        return { success: true }
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}