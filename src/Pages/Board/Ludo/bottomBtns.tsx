import { Button, Flex } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../Context/socketContext";

import DiceFace from "./diceFace";
import { DiceValue, Lobby } from "../../../utils/types";
type Props = {
  lobby: Lobby;
  state: string;
  turn: number;
  gameEnd: Boolean;
  diceValue: DiceValue;
  setDiceValue: any;
};

const BottomBtns = ({ lobby, turn, gameEnd, diceValue, setDiceValue }: Props) => {

  const { user } = useContext(SocketContext);
  //const [diceValue, setDiceValue] = useState<DiceValue>({ value: 0 });

  const { socket } = useContext(SocketContext);
  useEffect(() => {
    function onDiceValue(value: number) {
      setDiceValue({ value });
    }
    socket.on("dice_value", onDiceValue);
  }, []);
  const rollDice = () => {
    socket.emit("dice_roll", lobby.lobbyId);
  };
  return (
    <>
      {user && !gameEnd && <Flex gap="15px" alignItems="center">
        {lobby.started !== 0 && (
          <>
            {lobby.players.indexOf(user.username) === turn && (
              <Button colorScheme="green" onClick={rollDice}>
                Roll
              </Button>
            )}
            {!(lobby.players.indexOf(user.username) === turn) && (
              <Button onClick={rollDice}>Roll</Button>
            )}
          </>
        )}

        {diceValue.value === 0 ? <></> : <DiceFace diceValue={diceValue} />}
      </Flex>}
    </>
  );
};
export default BottomBtns;
//
