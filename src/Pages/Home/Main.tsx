import { Flex } from "@chakra-ui/react";
import { CreateLobby } from "./CreateLobby";
import { CurrentLobbies } from "./CurrentLobbies";
import { useContext, useEffect } from "react";
import { SocketContext } from "../Context/socketContext";
import { useNavigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { SocketContext } from "../Context/socketContext";
// import { useNavigate } from "react-router-dom";

export const Main = () => {

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    function onAlreadyGame(res: any) {

      navigate(`/game/${res.lobbyId}`, { state: { lobby: res } });
    }
    socket.on("already_game", onAlreadyGame);
  }, []);
  return (
    <>
      <Flex flexGrow={"1"} flexDirection={"column"} alignItems={"center"}>
        <Flex
          paddingX="10%"
          paddingY="25px"
          height="100%"
          width="80%"
          flexDirection={"column"}
          gap={"25px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CreateLobby />
          <CurrentLobbies />
        </Flex>
      </Flex>
    </>
  );
};
