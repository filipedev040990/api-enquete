import { ControllerInterface, HttpRequest, HttpResponse } from '../../presentation/interfaces'
import { LogControllerDecorator } from './log.decorator'

type SutType = {
  sut: LogControllerDecorator
  singupControllerStub: ControllerInterface
}

const makeSut = (): SutType => {
  const singupControllerStub = makeSignupControllerStub()
  const sut = new LogControllerDecorator(singupControllerStub)
  return { sut, singupControllerStub }
}

const makeSignupControllerStub = (): ControllerInterface => {
  class SignupControllerStub implements ControllerInterface {
    async execute (request: HttpRequest): Promise<HttpResponse> {
      return {
        statusCode: 200,
        body: {
          email: 'anyEmail@email.com',
          name: 'anyName',
          password: 'anyPassword'
        }
      }
    }
  }
  return new SignupControllerStub()
}

describe('LogController Decorator', () => {
  test('should call controller.execute with correct values', async () => {
    const { sut, singupControllerStub } = makeSut()
    const spy = jest.spyOn(singupControllerStub, 'execute')
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        name: 'anyName',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    await sut.execute(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return the same result of controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        name: 'anyName',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    const response = await sut.execute(httpRequest)
    expect(response).toEqual({
      statusCode: 200,
      body: {
        email: 'anyEmail@email.com',
        name: 'anyName',
        password: 'anyPassword'
      }
    })
  })
})
