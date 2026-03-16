import { metaService } from "@/service/meta.service";
import { Clock, DollarSign, Star, TrendingDown, TrendingUp, Users } from "lucide-react";

async function AllSummaries() {
  let summaries: ProviderAllSummaries | null = null;
  try {
    const res =
      await metaService.providerAllSummaries()
      summaries = res.data  as ProviderAllSummaries;
  } catch (error: any) {
    return <p>{error.message}</p>;
  }

  console.log(summaries)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          label: "Total Revenue",
          value: summaries.totalRevenue.value.toLocaleString(),
          progress: summaries.totalRevenue.progress,
          icon: DollarSign,
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
        },
        {
          label: "Active Orders",
          value: summaries.activeOrders.value.toLocaleString(),
          progress: summaries.activeOrders.progress,
          icon: Clock,
          color: "text-orange-500",
          bg: "bg-orange-500/10",
        },
        {
          label: "Total Customers",
          value: summaries.totalCustomers.value.toLocaleString(),
          progress: summaries.totalCustomers.progress,
          icon: Users,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        },
        {
          label: "Avg. Rating",
          value: summaries.avgRating.value,
          progress: summaries.avgRating.progress,
          icon: Star,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-card border-2 border-muted p-6 rounded-[2rem] hover:border-emerald-500/30 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
              <stat.icon size={24} />
            </div>
          {
			stat.progress > 0 ?
			  <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-lg">
              <TrendingUp size={12} /> +${stat.progress}%
            </div>
			:
			  <div className="flex items-center gap-1 text-[10px] font-black text-red-500 bg-emerald-500/5 px-2 py-1 rounded-lg">
              <TrendingDown size={12} /> ${stat.progress}%
            </div>
		  }
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {stat.label}
          </p>
          <h3 className="text-2xl font-black italic uppercase mt-1">
            {stat.label === "Total Revenue" ? `৳${stat.value}` : stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default AllSummaries;
