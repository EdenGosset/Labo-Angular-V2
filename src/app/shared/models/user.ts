import {UserGender} from "../enums/userGender";
import {UserRole} from "../enums/userRole";

export interface User {
  id: string
  username: string
  email: string
  birthDate: Date
  elo: number
  gender: UserGender
  role: UserRole
}

export interface UserRegister {
  username: string
  email: string
  birthDate: Date
  elo: number
  gender: UserGender
}
