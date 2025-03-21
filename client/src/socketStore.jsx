import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set, get) => ({
  socket: null,

  connectSocket: () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (get().socket) return; 

    const socket = io(`${import.meta.env.VITE_SOCKET}`, {
      transports : ["websocket"],
      withCredentials: true,
        auth: { token },
      });

    socket.on("connect", () => console.log("Connected to Socket.IO"));
    socket.on("disconnect", () => console.log("Socket disconnected"));

    set({ socket });
  },

  disconnectSocket: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null };
    });
  },

  checkAndReconnect: () => {
    if (!get().socket || !get().socket.connected) {
      get().connectSocket(); 
    }
  },
}));

export default useSocketStore;
