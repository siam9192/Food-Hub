import { AppError } from "../errors/AppError.js";
import { auth } from "../lib/auth.js";
import status from "http-status";
export function socketAuth() {
    return async (socket, next) => {
        try {
            const session = await auth.api.getSession({
                headers: socket.handshake.headers,
            });
            if (!session) {
                next();
            }
            if (!session?.user.emailVerified) {
                return next(new AppError(status.FORBIDDEN, "Email verification required. Please verify your email!"));
            }
            const userRole = session.user.role;
            socket.data.user = {
                id: session?.user.id,
                email: session?.user.email,
                emailVerified: session?.user.emailVerified,
                name: session?.user.name,
                role: userRole,
            };
            next();
        }
        catch (error) { }
    };
}
