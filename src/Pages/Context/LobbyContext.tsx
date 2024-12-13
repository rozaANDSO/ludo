import { createContext } from "react";
import { Lobby } from "../../utils/types";
type LobbyContext = {
  lobby: Lobby;
  setLobby: object;
};
export const LobbyContext = createContext<LobbyContext | undefined>(undefined);
