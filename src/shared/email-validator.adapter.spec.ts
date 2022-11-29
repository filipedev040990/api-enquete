import { EmailValidatorAdapter } from './email-validator.adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('', () => {
  test('should call validator with correct email', () => {
    const sut = makeSut()
    const spy = jest.spyOn(validator, 'isEmail')
    sut.execute('anyEmail@email.com')
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return true if validator return true', () => {
    const sut = makeSut()
    const response = sut.execute('anyEmail@email.com')
    expect(response).toBeTruthy()
  })

  test('should return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const response = sut.execute('anyEmail@email.com')
    expect(response).toBeFalsy()
  })

  test('should return server error if validator throw an exception', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.execute).toThrow()
  })
})
