import { MissinParamError } from '../../errors'
import { badRequest } from '../../helpers/http.helper'
import { HttpRequest } from '../../interfaces'
import { LoginController } from './login.controller'

type SutType = {
  sut: LoginController
}

const makeSut = (): SutType => {
  const sut = new LoginController()
  return { sut }
}

let httpRequest: HttpRequest

describe('', () => {
  beforeEach(() => {
    httpRequest = {
      body: {
        email: 'anyEmail',
        password: 'anyPassword'
      }
    }
  })
  test('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    httpRequest.body.email = null
    const response = await sut.execute(httpRequest)
    expect(response).toEqual(badRequest(new MissinParamError('email')))
  })
})
