import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"

abstract class HttpClient {
  private accessToken: string | null = null
  protected readonly client: AxiosInstance

  constructor(private configuration: AxiosRequestConfig) {
    this.client = axios.create(this.configuration)

    this._initializeRequestInterceptor()
  }

  setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  private _initializeRequestInterceptor = () => {
    this.client.interceptors.request.use(this._handleRequest, this._handleError)
  }

  private _handleRequest = (configuration: InternalAxiosRequestConfig) => {
    if (this.accessToken) {
      configuration.headers?.set("Authorization", `Bearer ${this.accessToken}`)
    }

    return configuration
  }

  private _handleError = (error: unknown) => Promise.reject(error)
}

export default HttpClient
