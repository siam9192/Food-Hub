import { env } from "@/env";
import { cookies } from "next/headers";

export const metaService = {
  providerAllSummaries: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/api/meta/provider/summaries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to submit review");
    return data;
  },
};
