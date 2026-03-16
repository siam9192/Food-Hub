type Summary = {
  value: number;
  progress: number;
};

type ProviderSummaryKey =
  | "totalRevenue"
  | "totalCustomers"
  | "activeOrders"
  | "avgRating";

type ProviderAllSummaries = Record<ProviderSummaryKey, Summary>;