import { UserRole } from "../prisma-output/enums.js";
export interface ConnectedUsers {
  id: string;
  role: UserRole;
}
export declare function setConnectedUser(
  socketId: string,
  user: ConnectedUsers,
): void;
export declare function removeConnectedUser(socketId: string): void;
export declare function getUserBySocketId(
  socketId: string,
): ConnectedUsers | null;
export declare function getAllUsers(): [string, ConnectedUsers][];
export declare function getUsersByIds(...ids: string[]): (ConnectedUsers & {
  socketId: string;
})[];
//# sourceMappingURL=store-connections.d.ts.map
