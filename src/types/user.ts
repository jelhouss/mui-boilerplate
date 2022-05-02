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
  dayOfBirth: number
  yearOfBirth: number
  monthOfBirth: number
  gender: UserGender
  createdAt: string
  updatedAt: string
  avatar: string
}
