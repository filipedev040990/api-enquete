import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async () => {
    return await Promise.resolve('anyToken')
  }
}))

type SutType = {
  sut: JwtAdapter
}

const secretKey = 'sa13d2s45e46r46e5'
const makeSut = (): SutType => {
  const sut = new JwtAdapter(secretKey)
  return { sut }
}

describe('', () => {
  test('should call JwtAdapter with correct values', async () => {
    const { sut } = makeSut()
    const spy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('anyId')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyId', secretKey)
  })

  test('should throw if JwtAdapter throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const response = sut.encrypt('anyId')
    await expect(response).rejects.toThrow()
  })

  test('should return an token on success', async () => {
    const { sut } = makeSut()
    const token = await sut.encrypt('anyId')
    expect(token).toBe('anyToken')
  })
})
