import { Positions } from '../Pages/Board/types'

export type LobbyEmit = {
  //sent from server
  code: 200
  msg: string
  lobby: Lobby
  //
}
export type Lobby = {
  lobbyId: string
  owner: string
  players: string[]
  started: number
  amount: number
  state: string
  turn: number
  positions: Positions
  password: boolean
}
export type DiceValue = {
  value: number
}
export type User = {
  //sent from server
  
  credit: number
  fname: string
  lname: string
  username: string
}
