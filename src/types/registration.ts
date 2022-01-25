import { User, UserGender } from "./user"

export interface RegistrationResponse {
  user: User
}

export interface RegistrationPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: UserGender
  dayOfBirth: number
  monthOfBirth: number
  yearOfBirth: number
}
