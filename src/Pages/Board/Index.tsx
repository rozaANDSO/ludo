import { useEffect, useState } from "react";
import "./styles.css";
import {
  STEP_LENGTH,
  PLAYERS,
  COORDINATES_MAP,
  STATE,
} from "../../utils/ludo/constants";
import { Player } from "./Ludo/player";
import { useContext } from "react";
import { SocketContext } from "../Context/socketContext";
import { PositionMaping, Positions, Spots } from "./types";
import { Flex, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import TopBtns from "./Ludo/topBtn";
import PlayerBases from "./Ludo/playerBases";
import BottomBtns from "./Ludo/bottomBtns";
import GameEnd from "./GameEnd";
import { DiceValue, Lobby } from "../../utils/types";
import { ErrorEvent } from "../components/error";

type GameStatus = {
  started: boolean;
  ended: boolean;
  winner: string;
};
const Board = () => {

  //@ts-ignore
  if (performance.getEntriesByType("navigation")[0].type !== "navigate") {
    window.location.href = '/';
  }

  const { socket } = useContext(SocketContext);
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    started: false,
    ended: false,
    winner: "",
  });

  const [diceValue, setDiceValue] = useState<DiceValue>({ value: 0 });
  const [lobby, setLobby] = useState<Lobby>();
  const [turn, setTurn] = useState(0);
  const [state, setState] = useState(STATE.DICE_NOT_ROLLED);
  //
  const [positions, setPositions] = useState<Spots>(new Spots())

  //
  const [positionMaping, setPositionMaping] = useState<PositionMaping>(
    new PositionMaping()
  );
  const { lobbyId } = useParams();
  useEffect(() => {

    function lobbyData(res: any) {

      setLobby(res)
      reset();

      setState(res.state)
      setTurn(res.turn)
      setGameStatus({
        started: res.lobbyStarted == 0 ? false : true,
        ended: false,
        winner: "",
      })
      // console.log(res)
      // console.log(res.started == 0 ? false : true,)
      // setLobby(lobby)

      //
      PLAYERS.forEach((player) => {
        //@ts-ignore
        [0, 1, 2, 3].forEach((piece) => {

          setPositionUI(player, piece, res.positions[player][piece]);
        });
      });

    }
    socket.emit("lobby_data", lobbyId, lobbyData);
  }, [lobbyId]);

  // useEffect(() => {
  //   PLAYERS.forEach((player) => {
  //     //@ts-ignore
  //     [0, 1, 2, 3].forEach((piece) => {

  //       setPositionUI(player, piece, positions[player][piece]);
  //     });
  //   });
  // }, [change])
  useEffect(() => {
    if (!socket) {
      return
    }
    async function onTurn(turn: number) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setTurn(turn);
    }
    const onDiceState = async (dstate: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setState(dstate);
    };

    const onHighlight = async ({ player, eligiblePieces }: any) => {
      // setElgibles(eligiblePieces);
      await highlight(player, eligiblePieces);
    };
    const onUnhighlight = () => {
      unhighlight();
    };
    const onPositionUI = ({ player, piece, newPosition }: any) => {

      setPositionUI(player, piece, newPosition);
    };
    const onReset = (newLobby: Lobby) => {
      setGameStatus({ ended: false, winner: "", started: true });
      reset();

      setLobby(newLobby);
    };
    const onGameEnd = (winner: any) => {
      setGameStatus({ ended: true, winner, started: true });

    };
    const onConDisPlayers = (lobby: Lobby) => {


      setLobby(lobby);
    };


    socket.on("dis_con", onConDisPlayers);
    socket.on("turn", onTurn);
    socket.on("dice_state", onDiceState);
    socket.on("highlight", onHighlight);
    socket.on("reset", onReset);
    socket.on("unhighlight", onUnhighlight);
    socket.on("position_ui", onPositionUI);
    socket.on("game_ended", onGameEnd);
    return () => {

      socket.off("dis_con", onConDisPlayers);
      socket.off("turn", onTurn);
      socket.off("dice_state", onDiceState);
      socket.off("highlight", onHighlight);
      socket.off("reset", onReset);
      socket.off("unhighlight", onUnhighlight);
      socket.off("position_ui", onPositionUI);
      socket.off("game_ended", onGameEnd);
    };
  }, []);



  async function highlight(player: string, p: number[]) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const uc = positionMaping;
    p.forEach((i) => {
      uc[player][i].class = "highlight";
      setPositionMaping(uc);
    });
  }
  function unhighlight() {
    const p = ["P1", "P2"];
    const n = [0, 1, 2, 3];
    const pos = positionMaping;
    p.forEach((o) => {
      n.forEach((ni) => {
        pos[o][ni].class = "default";
      });
    });
  }
  function setPositionUI(player: string, piece: number, newPosition: number) {///



    if (!COORDINATES_MAP[newPosition]) {
      return
    }
    //
    if (player == "P3" || player == "P4") {
      return
    }
    const cloneP: Spots = { ...positions }

    cloneP[player][piece] = newPosition
    setPositions(cloneP)
    //
    let count = -1

    for (const k in cloneP[player]) {
      if (cloneP[player][k] == newPosition) {
        count++
      }
    }
    const player2 = player === "P1" ? "P2" : "P1"
    let count2 = 0
    for (const k in cloneP[player2]) {
      if (cloneP[player2][k] == newPosition) {

        count2++
      }
    }

    let adjX = 0
    let adjy = 0
    if (count == 1) {
      adjX = 2
      adjy = 1
    }
    if (count == 2) {
      adjX = -2
      adjy = 1.5
    }
    if (count == 3) {
      // adjX = -1.5
      adjy = 1.5
    }
    ///////////////////////////////////////
    // let adjX2 = 0
    let adjy2 = 0
    if (count2 == 1) {
      // adjX2 = 3
      adjy2 = 2
    }
    if (count2 == 2) {
      // adjX2 = -3
      adjy2 = 1.5
    }
    if (count2 == 3) {
      // adjX2 = -1.5
      adjy2 = 2
    }




    ///
    const [x, y] = COORDINATES_MAP[newPosition];

    const uc = Object.assign({}, positionMaping);
    uc[player][piece].top = y * STEP_LENGTH - 2 + adjy + adjy2 + "%";
    uc[player][piece].left = x * STEP_LENGTH - 3 + adjX + adjy2 + "%";
    setPositionMaping(uc);

  }

  function reset() {
    const positions = new Positions();
    PLAYERS.forEach((player) => {
      //@ts-ignore
      [0, 1, 2, 3].forEach((piece) => {
        setPositionUI(player, piece, positions[player][piece]);

      });
    });
    unhighlight();
  }

  return (<>

    {!lobby && <>hellsdh</>}
    {lobby &&
      <>
        <ErrorEvent />
        {gameStatus.ended && <GameEnd winner={gameStatus.winner} lobby={lobby} />}

        <>
          <TopBtns lobby={lobby} started={gameStatus.started} />

          <div className="ludo-container">
            <div className="ludo">
              <PlayerBases />
              <div className="player-pieces">
                {lobby.players && <>{lobby.players.map((p, i) => {
                  return (
                    <Player
                      gameEnd={gameStatus.ended}
                      key={p}
                      lobby={lobby}
                      positionMaping={positionMaping}
                      player={`P${i + 1}`}
                    />
                  );
                })}</>}
              </div>
            </div>
            <Flex
              flexDirection="column"
              padding="25px"
              justifyContent="center"
              alignItems="center"
              gap="10px"
            >
              {lobby.started !== 0 && !gameStatus.ended && (
                <Text fontSize="xl" as="b">

                  {`${lobby?.players[turn]}`}'s turn
                </Text>
              )}

              <BottomBtns
                diceValue={diceValue}
                setDiceValue={setDiceValue}
                lobby={lobby}
                state={state}
                turn={turn}
                gameEnd={gameStatus.ended}
              />
            </Flex>
          </div>
        </>

      </>}</>
  );
  //

  //
}
export default Board;

