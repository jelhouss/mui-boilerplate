import { AxiosError } from "axios"

import BaseService from "../app/BaseService"
import { RegistrationPayload, RegistrationResponse } from "../types/registration"

class RegistrationService extends BaseService {
  async register(
    registrationPayload: RegistrationPayload
  ): Promise<RegistrationResponse | AxiosError> {
    const {
      data: { user }
    } = await this.client.post("/register", registrationPayload)

    const response: RegistrationResponse = { user }

    return response
  }
}

export default new RegistrationService({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/api`,
  headers: { Accept: "application/json" }
})
