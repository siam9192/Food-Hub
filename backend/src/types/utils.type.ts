import { UserRole } from "../prisma-output/enums.js";

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  role: UserRole;
}
