import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return await Promise.resolve('hashedPassword')
  }
}))

type SutType = {
  sut: BcryptAdapter
}
const salt = 12
const makeSut = (): SutType => {
  const sut = new BcryptAdapter(salt)
  return { sut }
}

describe('BcryptAdapter', () => {
  describe('hash', () => {
    test('should call BcryptAdapter with correct values', async () => {
      const { sut } = makeSut()
      const spy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('anyPassword')
      expect(spy).toHaveBeenCalledWith('anyPassword', salt)
    })

    test('should return a hashed value', async () => {
      const { sut } = makeSut()
      const response = await sut.hash('anyPassword')
      expect(response).toBe('hashedPassword')
    })

    test('should return server error if bcrypt  throw an exception', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const response = sut.hash('anyPassword')
      await expect(response).rejects.toThrow()
    })
  })

  describe('compare', () => {

  })
})
