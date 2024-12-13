import { createContext, useEffect, useState } from "react";

import { Socket, io } from "socket.io-client";
import { User } from "../../utils/types";
// import * as io from "socket.io-client";
type SocketConnection = {

  user: User | undefined;
  setUser: any;
  socket: Socket;
  token: boolean; // if it doesn't exist route to signin http://localhost:8080
  auth: boolean; //if this failed route to signin https://ludomulti.onrender.com/
};

//@ts-ignore
const token = JSON.parse(localStorage.getItem("token"));
const socket = io("https://ludomulti.onrender.com", {
  auth: { token: token },
}),
  //@ts-ignore
  SocketContext = createContext<SocketConnection>({

    user: undefined,
    token: token,
    auth: true,
  });

const SocketProvider = ({ children }: any) => {

  const [user, setUser] = useState<User>(
  );
  useEffect(() => {
    const onConnect = () => {

      console.log("connected to socket")

    }
    socket.on("connect", onConnect);
    return () => {
      socket.off("connect", onConnect);

    };
  }, []);
  useEffect(() => {
    socket.emit("user", (response: User) => {
      console.log(response);

      setUser(response);
    });


  }, []);
  return (
    <SocketContext.Provider value={{ setUser, socket, token, auth: true, user: user }}>
      {children}
    </SocketContext.Provider>
  );
};
export { SocketContext, SocketProvider };
