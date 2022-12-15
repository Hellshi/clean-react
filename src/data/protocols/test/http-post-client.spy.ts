import { HttpClientPostParams, HttpPostClient } from '../http/http-post-client'

export class HttpClientPostSpy implements HttpPostClient {
  url?: string
  body?: object

  async post (params: HttpClientPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
  }
}
