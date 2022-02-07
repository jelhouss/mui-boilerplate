import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

class BaseService {
  private accessToken: string | null = null

  protected client: AxiosInstance

  constructor(private configuration: AxiosRequestConfig) {
    this.client = axios.create(this.configuration)

    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          return {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${this.accessToken}`
            }
          }
        }

        return config
      },
      (error) => Promise.reject(error)
    )
  }

  public setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken
  }

  public getAccessToken(): string | null {
    return this.accessToken
  }
}

export default BaseService
