import HttpClient from "../app/HttpClient"
import ExamplePayload from "../types/example/ExamplePayload"
import ExampleResponse from "../types/example/ExampleResponse"

class ExampleService extends HttpClient {
  async tip(examplePayload: ExamplePayload): Promise<ExampleResponse> {
    const { data } = await this.client.post("/example/tip", examplePayload)
    return data
  }

  async getTips(): Promise<ExampleResponse[]> {
    const { data } = await this.client.get("/example/tip")
    return data
  }
}

export default new ExampleService({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/api`,
  headers: { Accept: "application/json" }
})
