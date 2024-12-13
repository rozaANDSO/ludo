import { useContext } from "react";
import { SocketContext } from "../../Context/socketContext";
import { PositionMaping } from "../types";
import { Lobby } from "../../../utils/types";

type Props = {
  gameEnd: boolean;
  lobby: Lobby;
  positionMaping: PositionMaping;
  player: string;
};
export const Player = ({ lobby, gameEnd, positionMaping, player }: Props) => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(SocketContext);
  const handlePieceClick = (e: any) => {
    if (!user) {
      return
    }
    const userID = lobby.owner == user.username ? "P1" : "P2"
    if (gameEnd) {
      return
    }
    //@ts-ignore
    const player = e.target.getAttribute("player-id");
    //@ts-ignore
    const piece = e.target.getAttribute("piece-r");
    if (player !== userID) {
      return
    }

    socket.emit("piece_click", lobby.lobbyId, player, piece);
  };

  return (
    <>
      <div
        onClick={handlePieceClick}
        className={`player-piece ${positionMaping[player][0].class}`}
        player-id={player}
        piece-r="0"
        style={{
          top: positionMaping[player][0].top,
          left: positionMaping[player][0].left,
        }}
      ></div>
      <div
        onClick={handlePieceClick}
        className={`player-piece ${positionMaping[player][1].class}`}
        player-id={player}
        piece-r="1"
        style={{
          top: positionMaping[player][1].top,
          left: positionMaping[player][1].left,
        }}
      ></div>
      <div
        onClick={handlePieceClick}
        className={`player-piece ${positionMaping[player][2].class}`}
        player-id={player}
        piece-r="2"
        style={{
          top: positionMaping[player][2].top,
          left: positionMaping[player][2].left,
        }}
      ></div>
      <div
        onClick={handlePieceClick}
        className={`player-piece ${positionMaping[player][3].class}`}
        player-id={player}
        piece-r="3"
        style={{
          top: positionMaping[player][3].top,
          left: positionMaping[player][3].left,
        }}
      ></div>
    </>
  );
};
