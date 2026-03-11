import { UserRole } from "../../generated/prisma/enums"

export interface AuthUser {
  id: string,
  email: string
  emailVerified: boolean,
  name: string
  role: UserRole
}