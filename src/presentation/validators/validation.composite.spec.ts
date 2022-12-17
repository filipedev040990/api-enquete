import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { ValidationComposite } from './validation.composite'
import { ValidationInterface } from '@/presentation/interfaces/validation.interface'

type SutType = {
  sut: ValidationComposite
  validationStubs: ValidationInterface []
}

const makeSut = (): SutType => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
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
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = await sut.validate({ anotherField: 'anyValue' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validaton succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'anyValue' })
    expect(error).toBeFalsy()
  })

  test('should return the first error if more then one validaton fails', async () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('email'))
    const error = await sut.validate({ anotherField: 'anyValue' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
