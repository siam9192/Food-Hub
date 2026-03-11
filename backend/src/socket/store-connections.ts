import { UserRole } from "../../generated/prisma/enums";

export interface ConnectedUsers {
  user_id: string;
  role: UserRole;
}

const connectedUsers = new Map<string, ConnectedUsers>();

export function setConnectedUser(socketId: string, user: ConnectedUsers) {
  connectedUsers.set(socketId, user);
}

export function removeConnectedUser (socketId:string) {
  connectedUsers.delete(socketId)
}

export function getUserBySocketId(socketId: string) {
  return connectedUsers.get(socketId) ?? null;
}

export function getUsersByIds(...ids: string[]) {
  const users: (ConnectedUsers & { socketId: string })[] = [];

  for (const [socketId, user] of connectedUsers.entries()) {
    if (ids.includes(user.user_id)) {
      users.push({
        socketId,
        ...user,
      });
    }
  }
  return users;
}
