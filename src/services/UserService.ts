import HttpClient from "../app/HttpClient"
import GetMeResponse from "../types/authentication/GetMeResponse"

class UserService extends HttpClient {
  async me(): Promise<GetMeResponse> {
    const { data } = await this.client.get("/user/me")
    return data
  }
}

export default new UserService({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/api`,
  headers: { Accept: "application/json" }
})
