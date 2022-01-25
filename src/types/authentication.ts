import { User } from "./user"

export interface AuthenticationResponse {
  user: User
  token: string
}

export interface AuthenticationPayload {
  email: string
  password: string
}
