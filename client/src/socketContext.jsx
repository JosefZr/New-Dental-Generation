import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SERVER_API}`, {
      extraHeaders: {
        authorization: localStorage.getItem("token") || "",
      },
    });
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    return () => socket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
