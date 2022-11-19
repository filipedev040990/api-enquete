import { LogRepositoryInterface } from '../../data/interfaces/log-repository.interface'
import { serverError } from '../../presentation/helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse } from '../../presentation/interfaces'
import { LogControllerDecorator } from './log.decorator'

type SutType = {
  sut: LogControllerDecorator
  singupControllerStub: ControllerInterface
  logRepositoryStub: LogRepositoryInterface
}

const makeSut = (): SutType => {
  const singupControllerStub = makeSignupControllerStub()
  const logRepositoryStub = makeLogRepository()
  const sut = new LogControllerDecorator(singupControllerStub, logRepositoryStub)
  return { sut, singupControllerStub, logRepositoryStub }
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

const makeLogRepository = (): LogRepositoryInterface => {
  class LogRepositoryStub implements LogRepositoryInterface {
    async log (stack: string): Promise<void> {

    }
  }
  return new LogRepositoryStub()
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

  test('should call LogRepository if controller.execute return server error', async () => {
    const { sut, singupControllerStub, logRepositoryStub } = makeSut()

    const error = new Error()
    error.stack = 'anyStack'

    jest.spyOn(singupControllerStub, 'execute').mockReturnValueOnce(Promise.resolve(serverError(error)))
    const spy = jest.spyOn(logRepositoryStub, 'log')

    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        name: 'anyName',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword'
      }
    }
    await sut.execute(httpRequest)
    expect(spy).toHaveBeenCalledWith('anyStack')
  })
})
