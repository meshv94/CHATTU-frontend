import { createContext, useEffect, useState, useContext, useMemo } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineuser, setOnlineuser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  // useEffect(() => {
  //   if (user) {
  //     const socket = io("https://chattu-server.onrender.com/", {
  //       query: { userId: user._id },
  //     });

  //     setSocket(socket);
  //     socket.on("getOnlineUsers", (users) => {
  //       setOnlineuser(users);
  //     });
  //     return () => socket.close();
  //   } else {
  //     if (socket) {
  //       socket.close();
  //       setSocket(null);
  //     }
  //   }
  // }, []);

  const connectSocket = (user) => {
    const socket = new io("https://chattu-server.onrender.com", {
      query: {
        userId: user._id,
      },
    });
    return socket;
  };

  useEffect(() => {
    if (user) {
      const socket = connectSocket(user);
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineuser(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  // return (
  //   <SocketContext.Provider value={{ socket, onlineuser }}>
  //     {children}
  //   </SocketContext.Provider>
  // );
  return (
    <SocketContext.Provider value={{ socket, onlineuser , connectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
