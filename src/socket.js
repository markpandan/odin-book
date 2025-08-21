import { io } from "socket.io-client";

const HOST_URL = import.meta.env.VITE_API_URL;
export const socket = io(HOST_URL, {
  ackTimeout: 10000,
  retries: 3,
  auth: {
    serverOffset: 0,
  },
});
