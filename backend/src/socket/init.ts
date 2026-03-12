import { Server } from "socket.io";
import { socketAuth } from "../middlewares/socketAuth.middleware";
import { registerSocketEvents } from "./events";
import {  setConnectedUser } from "./store-connections";

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
    console.log(user)
    console.log(`🟢 Socket connected: ${socket.id}`);
  });
}
