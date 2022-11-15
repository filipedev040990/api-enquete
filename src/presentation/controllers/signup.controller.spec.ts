import InvalidParamError from '../errors/invalid-param.error'
import MissinParamError from '../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'
import SignupController from './signup.controller'

interface SutType {
  sut: SignupController
}

const makeSut = (): SutType => {
  const sut = new SignupController()
  return { sut }
}

let request

describe('SignupController', () => {
  beforeEach(() => {
    request = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
  })

  test('should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    request.body.name = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('name')))
  })

  test('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    request.body.email = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('email')))
  })

  test('should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    request.body.password = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('password')))
  })

  test('should return 400 if password confirmation is not provided', async () => {
    const { sut } = makeSut()
    request.body.passwordConfirmation = null
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissinParamError('passwordConfirmation')))
  })

  test('should return 400 if password confirmation failed', async () => {
    const { sut } = makeSut()
    request.body.passwordConfirmation = 'anotherPassword'
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new InvalidParamError('password confirmation failed')))
  })
})
