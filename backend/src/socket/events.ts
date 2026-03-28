import { Socket } from "socket.io";

export const registerSocketEvents = (socket: Socket) => {
  // Handle disconnect
  socket.on("disconnect", async (reason) => {
    console.log(`🔴 Socket disconnected: ${socket.id}, reason: ${reason}`);
  });
};
