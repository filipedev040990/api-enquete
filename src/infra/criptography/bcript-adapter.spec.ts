import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

type SutType = {
  sut: BcryptAdapter
}
const salt = 12
const makeSut = (): SutType => {
  const sut = new BcryptAdapter(salt)
  return { sut }
}

describe('BcryptAdapter', () => {
  test('should call BcryptAdapter with correct values', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('anyPassword')
    expect(spy).toHaveBeenCalledWith('anyPassword', salt)
  })
})
