import HttpClient from "../app/HttpClient"
import RegistrationPayload from "../types/registration/RegistrationPayload"
import RegistrationResponse from "../types/registration/RegistrationResponse"

class RegistrationService extends HttpClient {
  async register(registrationPayload: RegistrationPayload): Promise<RegistrationResponse> {
    const { data } = await this.client.post("/register", registrationPayload)
    return data
  }
}

export default new RegistrationService({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/api`,
  headers: { Accept: "application/json" }
})
