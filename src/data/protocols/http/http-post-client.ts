import { HttpResponse } from './http-responses'

export interface HttpClientPostParams {
  url: string
  body?: object
}

export interface HttpPostClient {
  post: (params: HttpClientPostParams) => Promise<HttpResponse>
}
