import { Server } from "socket.io";
export declare function setIo(server_io: Server): void;
export declare function getIo(): Server<
  import("socket.io").DefaultEventsMap,
  import("socket.io").DefaultEventsMap,
  import("socket.io").DefaultEventsMap,
  any
> | null;
export declare function initIo(io: Server): void;
//# sourceMappingURL=init.d.ts.map
