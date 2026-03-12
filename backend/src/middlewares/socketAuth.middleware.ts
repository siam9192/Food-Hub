import { Socket } from "socket.io";
import { AppError } from "../errors/AppError";
import { statusCodes } from "better-auth";
import { auth } from "../lib/auth";
import { UserRole } from "../../generated/prisma/enums";

export function socketAuth() {
  return async (socket: Socket, next: (err?: Error) => void) => {
    
    try {
      const session = await auth.api.getSession({
        headers: socket.handshake.headers as any,
      });

      if (!session) {
        next();
      }

      if (!session?.user.emailVerified) {
        return next(
          new AppError(
            statusCodes.FORBIDDEN,
            "Email verification required. Please verify your email!",
          ),
        );
      }

      const userRole = session.user.role as UserRole;

      socket.data.user = {
        id: session?.user.id!,
        email: session?.user.email!,
        emailVerified: session?.user.emailVerified as boolean,
        name: session?.user.name!,
        role: userRole,
      };
      
      next();
    } catch (error) {}
  };
}
