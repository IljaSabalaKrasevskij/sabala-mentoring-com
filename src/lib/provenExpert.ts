import { unstable_cache } from "next/cache";

export type ProvenExpertSummary = {
  ratingValue: number;
  reviewCount: number;
  recommendationRate: number;
  source: "live" | "fallback";
};

const FALLBACK: ProvenExpertSummary = {
  ratingValue: 4.96,
  reviewCount: 153,
  recommendationRate: 100,
  source: "fallback",
};

async function fetchSummary(): Promise<ProvenExpertSummary> {
  const user = process.env.PROVEN_EXPERT_USER;
  const key = process.env.PROVEN_EXPERT_API_KEY;

  if (!user || !key) return FALLBACK;

  try {
    const auth = Buffer.from(`${user}:${key}`).toString("base64");
    const res = await fetch(
      "https://www.provenexpert.com/api/v1/rating/summary/get",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: "{}",
        next: { revalidate: 21600 }, // 6 hours
      }
    );

    if (!res.ok) return FALLBACK;
    const data = await res.json();
    if (data.status !== "success") return FALLBACK;

    return {
      ratingValue: typeof data.ratingValue === "number" ? data.ratingValue : FALLBACK.ratingValue,
      reviewCount: typeof data.reviewCount === "number" ? data.reviewCount : FALLBACK.reviewCount,
      recommendationRate:
        typeof data.recommendationRate === "number"
          ? data.recommendationRate
          : FALLBACK.recommendationRate,
      source: "live",
    };
  } catch {
    return FALLBACK;
  }
}

export const getProvenExpertSummary = unstable_cache(
  fetchSummary,
  ["proven-expert-summary"],
  { revalidate: 21600, tags: ["proven-expert"] }
);

export const PROVEN_EXPERT_PROFILE_URL =
  process.env.PROVEN_EXPERT_PROFILE_URL ||
  "https://www.provenexpert.com/sabala-mentoring-llc/";
