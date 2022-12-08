import { ValidationInterface } from '../../../interfaces'
import { AddSurveyController } from './add-survey'
import { badRequest } from '../../../helpers/http.helper'
import { MissingParamError } from '../../../errors/missing-param.error'

type SutType = {
  sut: AddSurveyController
  validationStub: ValidationInterface
}

const makeSut = (): SutType => {
  const validationStub = makeValidationStub()
  const sut = new AddSurveyController(validationStub)
  return { sut, validationStub }
}

const makeValidationStub = (): ValidationInterface => {
  class Validation implements ValidationInterface {
    validate (input: any): Error | null {
      return null
    }
  }
  return new Validation()
}

let request
describe('AddSurveyController', () => {
  beforeEach(() => {
    request = {
      body: {
        question: 'anyQuestion',
        answers: {
          image: '',
          answer: 'anyAnswer'
        }
      }
    }
  })

  test('should call Validations once and with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const spy = jest.spyOn(validationStub, 'validate')
    await sut.execute(request)
    expect(spy).toBeCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(request.body)
  })

  test('should return 400 if Validations fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('anyField'))
    const response = await sut.execute(request)
    expect(response).toEqual(badRequest(new MissingParamError('anyField')))
  })
})