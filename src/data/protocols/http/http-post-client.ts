import { HttpResponse } from './http-responses'

export interface HttpClientPostParams<T> {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post: (params: HttpClientPostParams<T>) => Promise<HttpResponse<R>>
}
