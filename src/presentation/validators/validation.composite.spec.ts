import { MissingParamError } from '../errors'
import { ValidationComposite } from './validation.composite'
import { ValidationInterface } from './validation.interface'

type SutType = {
  sut: ValidationComposite
  validationStub: ValidationInterface
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return { sut, validationStub }
}

const makeValidation = (): ValidationInterface => {
  class ValidationStub implements ValidationInterface {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

describe('Validation Composite', () => {
  test('should return an error if any validaton fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = await sut.validate({ anotherField: 'anyValue' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validaton succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'anyValue' })
    expect(error).toBeFalsy()
  })
})
