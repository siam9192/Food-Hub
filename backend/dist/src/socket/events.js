export const registerSocketEvents = (socket) => {
    // Handle disconnect
    socket.on("disconnect", async (reason) => {
        console.log(`🔴 Socket disconnected: ${socket.id}, reason: ${reason}`);
    });
};
