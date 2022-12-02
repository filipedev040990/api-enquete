import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt.adapter'

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
})
