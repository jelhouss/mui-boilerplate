export enum UserGender {
  M = "male",
  F = "female",
  O = "other"
}

interface User {
  firstName: string
  lastName: string
  dayOfBirth: string
  yearOfBirth: string
  monthOfBirth: string
  gender: UserGender
}

export default User
