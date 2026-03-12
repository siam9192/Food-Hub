import { UserRole } from "../../generated/prisma/enums";

export interface ConnectedUsers {
  id: string;
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

export function getAllUsers () {
return Array.from(connectedUsers)
}

export function getUsersByIds(...ids: string[]) {
  const users: (ConnectedUsers & { socketId: string })[] = [];
  for (const [socketId, user] of connectedUsers.entries()) {
    if (ids.includes(user.id)) {
      users.push({
        socketId,
        ...user,
      });
    }
  }

  console.log(users)
  return users;
}
