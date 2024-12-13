import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../../utils/types";
import { useContext } from "react";
import { SocketContext } from "../Context/socketContext";

type Props = {
  winner: string;
  lobby: Lobby;
};
const GameEnd = ({ winner, lobby }: Props) => {
  const { user } = useContext(SocketContext);
  const navigate = useNavigate();
  const homeBtn = () => {
    navigate("/");
  };
  return (
    <Flex
      flexDirection="column"

      marginTop="10px"
      justifyContent="center"
      alignItems="center"
      gap="10px"
    >
      <Text fontSize="xl" as="b">
        Game Ended
      </Text>
      <Center flexDir="column" justifyContent="center">
        {winner === user?.username && (
          <>
            <Text color="green" as="b">
              You Won
            </Text>

            <Text color="green">+{lobby.amount}</Text>
          </>
        )}
        {!(winner === user?.username) && (
          <>
            <Text color="red" as="b">
              You Lost
            </Text>
          </>
        )}
      </Center>
      <Button onClick={homeBtn} colorScheme="blue">
        Home
      </Button>
    </Flex>
  );
};
export default GameEnd;
