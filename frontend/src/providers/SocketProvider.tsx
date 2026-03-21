"use client";

import { io, Socket } from "socket.io-client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { env } from "@/env";
import { useAuth } from "./AuthContext";
import { User } from "@/types/user.types";
import { toast } from "sonner";
import { revalidatePaths } from "@/actions/utils.action";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

const orderRoutes: Record<string, string[]> = {
  admin: ["/admin-dashboard/orders"],
  customer: ["/dashboard/orders"],
  provider: [
    "/provider-dashboard/overview",
    "/provider-dashboard-orders",
    "/provider-dashboard/all-orders",
  ],
};

const events = [
  "order:placed",
  "order:preparing",
  "order:ready",
  "order:delivered",
  "order:canceled",
];

const SocketContext = createContext<Socket | null>(null);
export default function SocketProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const pathname = usePathname()
  const auth = useAuth();
  const user = auth.data?.user as User | undefined;

  const showMessage = (message: string) => {
    toast("New Notification", {
      description: message,
      action: {
        label: "Close",
        onClick: () => console.log("Toast closed"),
      },
      style: {
        padding: "10px",
      },
    });
  };

  useEffect(() => {
    if (!user) return;

    const socketInstance = io(env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    setSocket(socketInstance);

    const handleEvent = async ({ message }: { message: string }) => {
      console.log("Event received");

      const role = user.role.toLowerCase();
      const routes = orderRoutes[role];

      if (message) showMessage(message);

      if (routes) {
        await revalidatePaths(routes);
      }
    };

    socketInstance.on("connect", () => {
      console.log("Connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected");
    });

    events.forEach((event) => {
      socketInstance.on(event, handleEvent);
    });

    return () => {
      events.forEach((event) => {
        socketInstance.off(event, handleEvent);
      });

      socketInstance.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  if (!SocketContext) throw new Error("Socket not initialized");
  return SocketContext;
}
