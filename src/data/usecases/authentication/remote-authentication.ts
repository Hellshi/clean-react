import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-responses'
import { InvalidCredentialsError } from '@/domain/error/invalid-credentials-error'
import { UnexpectedError } from '@/domain/error/unexpected-error'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {
  }

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpClient.post({ url: this.url, body: params })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
