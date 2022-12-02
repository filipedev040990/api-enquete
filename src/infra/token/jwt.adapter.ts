import jwt from 'jsonwebtoken'
import { EncrypterAdapterInterface } from '../../data/interfaces/encrypter.adapter.interface'

export class JwtAdapter implements EncrypterAdapterInterface {
  constructor (private readonly secretKey: string) {}
  async encrypt (value: string): Promise<string> {
    await jwt.sign(value, this.secretKey)
    return null
  }
}
