import AllSummaries from "@/components/modules/provider/all-summaries";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShoppingBag, Users } from "lucide-react";

export default function ProviderOverview() {
  return (
    <div className="space-y-10 pb-10">
      {/* --- WELCOME HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight italic uppercase">
            Chef <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Here is what&apos;s happening with your kitchen today.
          </p>
        </div>
        <Button className="h-14 px-8 rounded-2xl font-black text-emerald-50 text-md bg-primary hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 gap-2">
          <ShoppingBag size={20} /> View Active Orders
        </Button>
      </div>

      {/* --- STATS GRID --- */}
      <AllSummaries />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- RECENT ORDERS TABLE (Simplified) --- */}
        <div className="lg:col-span-2 bg-card border-2 border-muted rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase">
              Recent <span className="text-primary">Orders</span>
            </h2>
            <Button
              variant="ghost"
              className="font-black uppercase text-[10px] tracking-widest gap-2"
            >
              See All <ArrowUpRight size={14} />
            </Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div
                key={order}
                className="flex items-center justify-between p-4 rounded-3xl bg-muted/20 border-2 border-transparent hover:border-muted transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center font-black text-muted-foreground">
                    #ORD
                  </div>
                  <div>
                    <p className="font-bold text-sm">Kacchi Biryani (Full)</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase">
                      Customer: Al Amin Sheikh
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-emerald-600">৳850.00</p>
                  <span className="text-[9px] font-black bg-orange-500/10 text-orange-600 px-2 py-0.5 rounded-full uppercase italic">
                    Preparing
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SHOP PERFORMANCE / QUICK ACTIONS --- */}
        <div className="space-y-6">
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black italic uppercase">
                Kitchen <br /> Status
              </h3>
              <p className="text-sm font-medium opacity-80">
                Your shop is currently accepting orders.
              </p>
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 rounded-2xl font-black uppercase italic text-xs h-12">
                Go Offline
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
              <ChefHat size={200} />
            </div>
          </div>

          <div className="bg-card border-2 border-muted p-8 rounded-[2.5rem] space-y-4">
            <h3 className="text-lg font-black italic uppercase">
              Quick <span className="text-primary">Links</span>
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                "Add New Item",
                "Edit Menu",
                "Payment Settings",
                "Kitchen Staff",
              ].map((link) => (
                <Button
                  key={link}
                  variant="outline"
                  className="justify-start h-12 rounded-xl border-muted hover:border-emerald-500 font-bold text-xs"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChefHat({ size, className }: { size: number; className?: string }) {
  return <Users size={size} className={className} />; // Placeholder icon
}
