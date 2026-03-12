"use client";
import { io } from "socket.io-client";
import  { ReactNode, useEffect } from "react";
import { env } from "@/env";
interface Props {
  children: ReactNode;
}
function SocketProvider({ children }: Props) {
  useEffect(() => {
    const socket = io(env.NEXT_PUBLIC_API_URL);
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected", socket.id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return children;
}

export default SocketProvider;
