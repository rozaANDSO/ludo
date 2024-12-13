import { useContext } from "react";
import { SocketContext } from "../../Context/socketContext";
import { Button, Center, Text, Wrap } from "@chakra-ui/react";
import { Lobby } from "../../../utils/types";

type Props = {
  lobby: Lobby;
  started: boolean;
};
const TopBtns = ({ lobby }: Props) => {
  const { socket, user } = useContext(SocketContext);
  const startResetGame = () => {
    if (!user) {
      return;
    }
    if (lobby.started == 1) {
      return;
    }

    socket.emit("start_reset", lobby.lobbyId);
  };

  return (<>
    {user && <Center
      paddingTop="10px"
      gap="10px"
      flexDir="column"
      justifyContent="center"
    >
      {

        lobby.owner
        == user.username && lobby.started == 0 && (
          <Button onClick={startResetGame}>Start</Button>
        )}
      <Text as="b">Players </Text>
      <Wrap>
        {lobby.players?.map((p: string, i: number) => (
          <Text key={i} as="kbd">
            {p}{4}
          </Text>
        ))}
      </Wrap>
    </Center>}</>
  );
};
export default TopBtns;
