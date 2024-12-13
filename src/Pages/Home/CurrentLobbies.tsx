import { Center, IconButton, Text } from "@chakra-ui/react";
import { LobbyInfo } from "./Lobby";
import { RepeatIcon } from "@chakra-ui/icons";
import { SocketContext } from "../Context/socketContext";

import { useContext, useEffect, useState } from "react";
import { Lobby } from "../../utils/types";
import { SearchBar } from "../components/Search";
// import { RepeatIcon } from "react-icons";
export const CurrentLobbies = () => {
  const [lobbies, setLobbies] = useState([]);
  const [search, setSearch] = useState<String>("");
  const { socket } = useContext(SocketContext);
  const searchChange = (e: any) => {
    setSearch(e.target.value);
  };
  const getLobbies = () => {
    socket.emit("lobbies", "", (response: any) => {
      if (response) {
        setLobbies(response);
      }
    });
  };
  const searchLobbies = () => {
    socket.emit("lobbies", search, (response: any) => {
      if (response) {
        setLobbies(response);
      }
    });
  };
  useEffect(() => {
    getLobbies();
  }, []);
  return (
    <>
      <Center>
        <SearchBar
          searchLobbies={searchLobbies}
          search={search}
          searchChange={searchChange}
        />
      </Center>
      <Center gap="5px">
        <Text fontSize="xl" as="b">
          Lobbies
        </Text>
        <IconButton
          onClick={getLobbies}
          background="transparent"
          aria-label="Refresh"
          icon={<RepeatIcon />}
        />
      </Center>
      {lobbies.map((l: Lobby) => (
        <Center key={l.lobbyId}>
          <LobbyInfo lobby={l} />
        </Center>
      ))}
    </>
  );
};
