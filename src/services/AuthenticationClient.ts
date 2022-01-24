import { AxiosError } from "axios"

import { AuthenticationPayload, AuthenticationResponse } from "../types/authentication"
import { User } from "../types/user"
import BaseClient from "./BaseClient"

class AuthenticationClient extends BaseClient {
  async signIn({
    email,
    password
  }: AuthenticationPayload): Promise<AuthenticationResponse | AxiosError> {
    const {
      data: { token }
    } = await this.client.post("/login", {
      email,
      password
    })

    this.setAccessToken(token)

    const dummyUser: Partial<User> = { email }

    const response: AuthenticationResponse = { token, user: dummyUser }

    return response
  }

  signOut(): void {
    this.setAccessToken(null)
  }
}

export default new AuthenticationClient({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  headers: { Accept: "application/json" }
})
