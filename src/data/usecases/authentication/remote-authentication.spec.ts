import { HttpClientPostSpy } from '../../protocols/test'
import faker from 'faker'
import { RemoteAuthentication } from './remote-authentication'
import { mockAccountModel, mockAuthentication } from '../../../domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/error'
import { HttpStatusCode } from '@/data/protocols/http'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account-model'

interface sutReturn {
  sut: RemoteAuthentication
  httpClientPostSpy: HttpClientPostSpy<AuthenticationParams, AccountModel>
}

describe('Remote Authentication', () => {
  const makeSut = (url: string = faker.internet.url()): sutReturn => {
    const httpClientPostSpy = new HttpClientPostSpy<AuthenticationParams, AccountModel>()
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

  test('Should throw InvalidCredentialsError if httpPostClient returns 401', async () => {
    const { httpClientPostSpy, sut } = makeSut()
    try {
      httpClientPostSpy.response = {
        statusCode: HttpStatusCode.unauthorized
      }
      const body = mockAuthentication()
      await sut.auth(body)
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidCredentialsError)
    }
  })

  test('Should throw UnexpectedError if httpPostClient returns 400', async () => {
    const { httpClientPostSpy, sut } = makeSut()
    try {
      httpClientPostSpy.response = {
        statusCode: HttpStatusCode.badRequest
      }
      const body = mockAuthentication()
      await sut.auth(body)
    } catch (e) {
      expect(e).toBeInstanceOf(UnexpectedError)
    }
  })
  // Hell's note: This does not seems like good practice to me
  test('Should throw UnexpectedError if httpPostClient returns 404', async () => {
    const { httpClientPostSpy, sut } = makeSut()
    try {
      httpClientPostSpy.response = {
        statusCode: HttpStatusCode.notFound
      }
      const body = mockAuthentication()
      await sut.auth(body)
    } catch (e) {
      expect(e).toBeInstanceOf(UnexpectedError)
    }
  })

  test('Should throw UnexpectedError if httpPostClient returns 500', async () => {
    const { httpClientPostSpy, sut } = makeSut()
    try {
      httpClientPostSpy.response = {
        statusCode: HttpStatusCode.serverError
      }
      const body = mockAuthentication()
      await sut.auth(body)
    } catch (e) {
      expect(e).toBeInstanceOf(UnexpectedError)
    }
  })

  test('Should return an AccountModel if httpPostClient returns 200', async () => {
    const { httpClientPostSpy, sut } = makeSut()
    const httpResult = mockAccountModel()

    httpClientPostSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const body = mockAuthentication()
    const response = await sut.auth(body)

    expect(response).toEqual(httpResult)
  })
})
