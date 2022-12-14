import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

class HttpClientPostSpy implements HttpPostClient {
  url?: string
  async post (url: string): Promise<void> {
    this.url = url
  }
}

describe('Remote Authentication', () => {
  test('Should call HttpPostClient with the correct URL', async () => {
    const url = 'any_url'
    const httpClientPostSpy = new HttpClientPostSpy()
    const sut = new RemoteAuthentication(url, httpClientPostSpy)
    await sut.auth()
    expect(httpClientPostSpy.url).toBe(url)
  })
})
