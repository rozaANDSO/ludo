import { useContext, useEffect } from "react";
import { SocketContext } from "../Context/socketContext";
import { useToast } from "@chakra-ui/react";
type ErrorEvent = {
  title: string;
  description: string;
};
export const ErrorEvent = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  useEffect(() => {
    const errorToast = (err: ErrorEvent) => {
      toast({
        title: err.title,
        description: err.description,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    };
    socket.on("error_emit", errorToast);
    return () => {
      // socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
      // socket.off('foo', onFooEvent);
      socket.off("error_emit", errorToast);
    };
  }, []);

  return <></>;
};
