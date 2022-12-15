export interface HttpClientPostParams {
  url: string
  body?: object
}

export interface HttpPostClient {
  post: (params: HttpClientPostParams) => Promise<void>
}
