export enum UserGender {
  M = "male",
  F = "female",
  O = "other"
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  dayOfBirth: string
  yearOfBirth: string
  monthOfBirth: string
  gender: UserGender
}
