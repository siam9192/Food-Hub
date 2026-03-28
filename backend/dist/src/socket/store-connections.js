const connectedUsers = new Map();
export function setConnectedUser(socketId, user) {
    connectedUsers.set(socketId, user);
}
export function removeConnectedUser(socketId) {
    connectedUsers.delete(socketId);
}
export function getUserBySocketId(socketId) {
    return connectedUsers.get(socketId) ?? null;
}
export function getAllUsers() {
    return Array.from(connectedUsers);
}
export function getUsersByIds(...ids) {
    const users = [];
    for (const [socketId, user] of connectedUsers.entries()) {
        if (ids.includes(user.id)) {
            users.push({
                socketId,
                ...user,
            });
        }
    }
    console.log(users);
    return users;
}
