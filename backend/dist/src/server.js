import app, { originCallback } from "./app.js";
import { prisma } from "./lib/prisma.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { initIo } from "./socket/init.js";
const PORT = process.env.PORT || 4000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: originCallback,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
        credentials: true,
    },
});
initIo(io);
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("An error occurred: ", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();
