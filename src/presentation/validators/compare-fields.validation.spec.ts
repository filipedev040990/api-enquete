import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields.validation'

type SutType = {
  sut: CompareFieldsValidation
}

const makeSut = (): SutType => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')
  return { sut }
}

describe('Compare Fields Validation', () => {
  test('should return a InvalidParamError if validation fails', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'anyValue', fieldToCompare: 'wrongValue' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ field: 'anyValue', fieldToCompare: 'anyValue' })
    expect(error).toBeFalsy()
  })
})
