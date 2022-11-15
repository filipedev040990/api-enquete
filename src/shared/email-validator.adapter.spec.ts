import { EmailValidatorAdapter } from './email-validator.adapter'
import validator from 'validator'

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('', () => {
  test('should ...', async () => {
    const sut = makeSut()
    const spy = jest.spyOn(validator, 'isEmail')
    await sut.execute('anyEmail@email.com')
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })
})
