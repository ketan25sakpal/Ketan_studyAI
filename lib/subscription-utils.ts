import { auth } from "@clerk/nextjs/server";
import { PLAN_LIMITS } from "./subscription-constants";
import { UserSubscriptionPlan } from "@/types";

export async function getUserPlanServer(): Promise<UserSubscriptionPlan> {
  const { has } = await auth();

  if (has({ plan: "pro" })) {
     return PLAN_LIMITS.pro;
  }
  
  if (has({ plan: "standard" })) {
     return PLAN_LIMITS.standard;
  }

  return PLAN_LIMITS.free;
}

// Since has() might be used with specific slugs in Clerk's Billing
export async function getPlanBySlug(slug: string): Promise<UserSubscriptionPlan> {
    if (slug === 'pro') return PLAN_LIMITS.pro;
    if (slug === 'standard') return PLAN_LIMITS.standard;
    return PLAN_LIMITS.free;
}
