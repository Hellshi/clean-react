import { HttpClientPostSpy } from '../../protocols/test/http-post-client.spy'
import faker from 'faker'
import { RemoteAuthentication } from './remote-authentication'
import { mockAuthentication } from '../../../domain/test/mock-authentication'

interface sutReturn {
  sut: RemoteAuthentication
  httpClientPostSpy: HttpClientPostSpy
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
    await sut.auth(mockAuthentication())
    expect(httpClientPostSpy.url).toBe(url)
  })

  test('Should call RemoteAuthentication with the correct body', async () => {
    const { httpClientPostSpy, sut } = makeSut()
    const body = mockAuthentication()
    await sut.auth(body)
    expect(httpClientPostSpy.body).toEqual(body)
  })
})
