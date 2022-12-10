import { AuthMIddleware } from './auth.middleware'
import { forbidden } from '../helpers/http.helper'
import { AccessDeniedError } from '../errors/access-denied.error'

type SutType = {
  sut: AuthMIddleware
}

const makeSut = (): SutType => {
  const sut = new AuthMIddleware()
  return { sut }
}

describe('Auth Middleware', () => {
  test('should return 403 if token is not provided in request header', async () => {
    const { sut } = makeSut()
    const response = await sut.execute({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })
})
