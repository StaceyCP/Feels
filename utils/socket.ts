import { io, Socket } from "socket.io-client";

interface SocketData extends Socket {
  isProfessional?: boolean;
  isWaiting?: boolean;
  connectionID?: string;
  username?: string;
  fullname?: string;
}

export const socket: SocketData = io("http://192.168.0.23:9090", {
  autoConnect: false,
});
