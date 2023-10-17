
import {User} from "./user";
import {Match} from "./match";
import {TournamentCategory} from "../enums/tournamentCategory";
import {TournamentStatus} from "../enums/tournamentStatus";

export interface TournamentDetails {
  id: string,
  name?: string
  location?: string
  minPlayers: number
  maxPlayers: number
  eloMin?: number
  eloMax?: number
  categories: TournamentCategory[]
  womenOnly: boolean
  endOfRegistration: Date
  count: number
  canRegister: boolean
  isRegistered: boolean
  status: TournamentStatus
  currentRound: number
  players?: User[]
  canStart: boolean
  canValidateRound: boolean
  matches?: Match[]
}
