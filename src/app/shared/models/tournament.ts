import {TournamentCategory} from "../enums/tournamentCategory";
import {TournamentStatus} from "../enums/tournamentStatus";


export interface Tournament {
  id: string
  name?: string
  location?: string
  minPlayers: number
  maxPlayers: number
  eloMin?: number
  eloMax?: number
  categories?: TournamentCategory[]
  womenOnly: boolean
  endOfRegistrationDate: Date
  count: number
  canRegister: boolean
  isRegistered: boolean
  status: TournamentStatus
  currentRound: number
}
