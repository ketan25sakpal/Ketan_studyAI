import { auth } from "@clerk/nextjs/server";
import { UserSubscriptionPlan } from "@/types";

export type PlanSlug = "free" | "standard" | "pro";

export const PLANS: Record<string, PlanSlug> = {
  FREE: "free",
  STANDARD: "standard",
  PRO: "pro",
  free: "free",
  standard: "standard",
  pro: "pro",
};

export type PlanType = PlanSlug;

export const PLAN_LIMITS: Record<PlanSlug, UserSubscriptionPlan> = {
  free: {
    slug: "free",
    maxBooks: 2,
    maxSessionsPerMonth: 5,
    maxMinPerSession: 10,
    hasSessionHistory: false,
  },
  standard: {
    slug: "standard",
    maxBooks: 10,
    maxSessionsPerMonth: 20,
    maxMinPerSession: 30,
    hasSessionHistory: true,
  },
  pro: {
    slug: "pro",
    maxBooks: 50,
    maxSessionsPerMonth: 100,
    maxMinPerSession: 60,
    hasSessionHistory: true,
  },
};

export const getUserPlan = async (): Promise<PlanType> => {
  const { has, userId } = await auth();

  if (!userId) return PLANS.free;

  if (has({ plan: "pro" })) return PLANS.pro;
  if (has({ plan: "standard" })) return PLANS.standard;
  return PLANS.free;
};

export const getPlanLimits = async () => {
  const plan = await getUserPlan();
  return PLAN_LIMITS[plan];
};

export const getCurrentBillingPeriodStart = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
};