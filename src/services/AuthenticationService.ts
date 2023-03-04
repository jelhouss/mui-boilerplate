import HttpClient from "../app/HttpClient"
import AuthenticationPayload from "../types/authentication/AuthenticationPayload"
import AuthenticationResponse from "../types/authentication/AuthenticationResponse"

class AuthenticationService extends HttpClient {
  async signIn(authenticationPayload: AuthenticationPayload): Promise<AuthenticationResponse> {
    const { data } = await this.client.post("/authenticate", authenticationPayload)

    const { token } = data

    this.setAccessToken(token)

    return data
  }

  async signOut(): Promise<void> {
    this.setAccessToken(null)
  }
}

export default new AuthenticationService({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/api`,
  headers: { Accept: "application/json" }
})
