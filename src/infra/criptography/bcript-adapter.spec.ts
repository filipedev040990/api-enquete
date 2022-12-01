import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (value: string, salt: number): Promise<string> {
    return await Promise.resolve('hashedPassword')
  },
  async compare (value: string, valueToCompare: string): Promise<boolean> {
    return await Promise.resolve(true)
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
    test('should call BcryptAdapter.hash with correct values', async () => {
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
    test('should call BcryptAdapter.compare with correct values', async () => {
      const { sut } = makeSut()
      const spy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('anyPassword', 'hashedPassword')
      expect(spy).toHaveBeenCalledWith('anyPassword', 'hashedPassword')
    })

    test('should return false if compare fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
        return await Promise.resolve(false)
      })
      const response = await sut.compare('anyPassword', 'hashedPassword')
      expect(response).toBeFalsy()
    })

    test('should return true when compare succeeds', async () => {
      const { sut } = makeSut()
      const response = await sut.compare('anyPassword', 'hashedPassword')
      expect(response).toBe(true)
    })
  })
})
