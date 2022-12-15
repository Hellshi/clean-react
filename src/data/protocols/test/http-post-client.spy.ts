import { HttpClientPostParams, HttpPostClient } from '../http/http-post-client'
import { HttpResponse, HttpStatusCode } from '../http/http-responses'

export class HttpClientPostSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post (params: HttpClientPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
