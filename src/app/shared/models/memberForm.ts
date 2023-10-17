import {UserGender} from "../enums/userGender";


export interface MemberForm {
  username: string
  email: string
  birthDate: Date
  elo?: number
  gender: UserGender
}
