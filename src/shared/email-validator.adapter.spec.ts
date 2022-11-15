import { EmailValidatorAdapter } from './email-validator.adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  async isEmail (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('', () => {
  test('should call validator with correct email', async () => {
    const sut = makeSut()
    const spy = jest.spyOn(validator, 'isEmail')
    await sut.execute('anyEmail@email.com')
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return true if validator return true', async () => {
    const sut = makeSut()
    const response = await sut.execute('anyEmail@email.com')
    expect(response).toBeTruthy()
  })

  test('should return false if validator return false', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const response = await sut.execute('anyEmail@email.com')
    expect(response).toBeFalsy()
  })

  test('should return server error if validator throw an exception', async () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = sut.execute('anyEmail@email.com')
    await expect(response).rejects.toThrow()
  })
})
