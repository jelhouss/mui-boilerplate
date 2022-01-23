import { AxiosError } from "axios"

import { RegistrationPayload, RegistrationResponse } from "../types/registration"
import { User } from "../types/user"
import BaseClient from "./BaseClient"

class RegistrationClient extends BaseClient {
  async register({
    email,
    password
  }: Partial<RegistrationPayload>): Promise<RegistrationResponse | AxiosError> {
    const {
      data: { token, id }
    } = await this.client.post("/register", {
      email,
      password
    })

    this.setAccessToken(token)

    const dummyUser: Partial<User> = { id }

    const response: RegistrationResponse = { token, user: dummyUser }

    return response
  }
}

export default new RegistrationClient({
  baseURL: process.env.REACT_APP_SERVER_API_URL,
  headers: { Accept: "application/json" }
})
