interface HttpClientPostParams {
  url?: string
}

export interface HttpPostClient {
  post: (params: HttpClientPostParams) => Promise<void>
}
