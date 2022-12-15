import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import faker from 'faker'
import { RemoteAuthentication } from './remote-authentication'

interface sutReturn {
  sut: RemoteAuthentication
  httpClientPostSpy: HttpClientPostSpy
}

class HttpClientPostSpy implements HttpPostClient {
  url?: string
  async post (url: string): Promise<void> {
    this.url = url
  }
}

describe('Remote Authentication', () => {
  const makeSut = (url: string = faker.internet.url()): sutReturn => {
    const httpClientPostSpy = new HttpClientPostSpy()
    const sut = new RemoteAuthentication(url, httpClientPostSpy)
    return { sut, httpClientPostSpy }
  }

  test('Should call HttpPostClient with the correct URL', async () => {
    const url = faker.internet.url()
    const { httpClientPostSpy, sut } = makeSut(url)
    await sut.auth()
    expect(httpClientPostSpy.url).toBe(url)
  })
})
