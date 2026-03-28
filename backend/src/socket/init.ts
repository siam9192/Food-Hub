import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.middleware.js";
import { registerSocketEvents } from "./events.js";
import { setConnectedUser } from "./store-connections.js";

let io: Server | null;

export function setIo(server_io: Server) {
  io = server_io;
}

export function getIo() {
  return io;
}

export function initIo(io: Server) {
  io.use(socketAuth());
  setIo(io);
  io.on("connection", function (socket) {
    registerSocketEvents(socket);
    const user = socket.data.user;
    if (user) {
      setConnectedUser(socket.id, socket.data.user);
    }
    console.log(`🟢 Socket connected: ${socket.id}`);
  });
}
