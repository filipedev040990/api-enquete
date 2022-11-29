import { MissinParamError } from '../errors'
import { RequiredFieldsValidation } from './required-fields.validation'

type SutType = {
  sut: RequiredFieldsValidation
}

const makeSut = (): SutType => {
  const sut = new RequiredFieldsValidation('email')
  return { sut }
}

describe('Required Fields Validation', () => {
  test('should return a MissingParamError if validation fails', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ anotherField: 'anyValue' })
    expect(error).toEqual(new MissinParamError('email'))
  })
})
