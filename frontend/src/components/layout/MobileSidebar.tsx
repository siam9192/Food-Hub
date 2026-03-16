"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarLink } from "@/components/ui/SidebarLink";
import { handleLogout } from "@/lib/utils";
import { Hamburger, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

export function MobileSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open}>
      <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
      </Button>

      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-left font-bold">
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="bg-primary p-1 rounded-lg shadow-lg shadow-primary/20">
                <span className="text-xl">
                  <Hamburger size={25} />
                </span>
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                FoodHub
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="px-3 py-4 space-y-1">
          {role === "CUSTOMER" && (
            <>
              <SidebarLink href="/dashboard/orders" label="My Orders" />
              <SidebarLink href="/dashboard/profile" label="My Profile" />
            </>
          )}

          {role === "PROVIDER" && (
            <>
              <SidebarLink href="/provider-dashboard/orders" label="Orders" />
              <SidebarLink href="/provider-dashboard/meals" label="Meals" />
            </>
          )}

          {role === "ADMIN" && (
            <>
              <SidebarLink href="/admin-dashboard/users" label="Users" />
              <SidebarLink href="/admin-dashboard/orders" label="Orders" />
              <SidebarLink
                href="/admin-dashboard/categories"
                label="Categories"
              />
            </>
          )}
        </nav>

        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500"
            onClick={() => handleLogout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
