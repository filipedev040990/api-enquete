import MissinParamError from '../errors/missing-param-error'
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
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissinParamError('name'))
  })
})
