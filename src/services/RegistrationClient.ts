import { AxiosError } from "axios"

import { RegistrationPayload, RegistrationResponse } from "../types/registration"
import BaseClient from "./BaseClient"

class RegistrationClient extends BaseClient {
  async register({
    email,
    password
  }: RegistrationPayload): Promise<RegistrationResponse | AxiosError> {
    const {
      data: { user }
    } = await this.client.post("/register", {
      email,
      password
    })

    const response: RegistrationResponse = { user }

    return response
  }
}

export default new RegistrationClient({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/api`,
  headers: { Accept: "application/json" }
})
