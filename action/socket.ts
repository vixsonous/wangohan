import { io, Socket } from "socket.io-client";

let socket:Socket;

export const registerSocketUser = (user_id: number) => {
  const s = getSocket();
  s.emit("register", user_id);
}

export const getSocket = () => {
  if(!socket) {
    socket = io(process.env.BASE_URL);
  }

  return socket;
}