import { HttpPostClient } from '../http/http-post-client'

interface HttpClientPostSpyParams {
  url?: string
}

export class HttpClientPostSpy implements HttpPostClient {
  url?: string
  async post (params: HttpClientPostSpyParams): Promise<void> {
    this.url = params.url
  }
}
