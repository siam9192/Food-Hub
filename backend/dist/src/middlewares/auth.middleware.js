import { auth } from "../lib/auth.js";
export var UserRole;
(function (UserRole) {
    UserRole["customer"] = "CUSTOMER";
    UserRole["provider"] = "PROVIDER";
    UserRole["admin"] = "ADMIN";
})(UserRole || (UserRole = {}));
export const authMiddleware = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized!",
                });
            }
            if (!session?.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verification required. Please verify your email!",
                });
            }
            const userRole = session.user.role;
            req.user = {
                id: session?.user.id,
                email: session?.user.email,
                emailVerified: session?.user.emailVerified,
                name: session?.user.name,
                role: userRole,
            };
            if (roles.length && !roles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You do not have permission to access this resource!",
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
