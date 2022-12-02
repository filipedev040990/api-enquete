import jwt from 'jsonwebtoken'
import env from '../../main/env'
import { JwtAdapter } from './jwt.adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async () => {
    return await Promise.resolve('anyToken')
  }
}))

type SutType = {
  sut: JwtAdapter
}

const secretKey = env.encrypter.secretKey
const expiresIn = env.encrypter.expiresIn
const makeSut = (): SutType => {
  const sut = new JwtAdapter(secretKey, expiresIn)
  return { sut }
}

describe('', () => {
  test('should call JwtAdapter with correct values and expiresIn in constructor', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ account_id: 'anyId' })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({ account_id: 'anyId' }, secretKey, { expiresIn })
  })

  test('should call JwtAdapter with correct values and without expiresIn in constructor', async () => {
    const sut = new JwtAdapter(secretKey)
    const spy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ account_id: 'anyId' })
    expect(spy).toHaveBeenCalledWith({ account_id: 'anyId' }, secretKey, { expiresIn })
  })

  test('should throw if JwtAdapter throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const response = sut.encrypt({ account_id: 'anyId' })
    await expect(response).rejects.toThrow()
  })

  test('should return an token on success', async () => {
    const { sut } = makeSut()
    const token = await sut.encrypt({ account_id: 'anyId' })
    expect(token).toBe('anyToken')
  })
})
