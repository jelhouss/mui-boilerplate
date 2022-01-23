import { User } from "./user"

export interface AuthenticationResponse {
  user: Partial<User>
  token: string
}

export interface AuthenticationPayload {
  email: string
  password: string
}
