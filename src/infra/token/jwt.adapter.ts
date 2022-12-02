import jwt from 'jsonwebtoken'
import { EncrypterAdapterInterface } from '../../data/interfaces/encrypter.adapter.interface'

export class JwtAdapter implements EncrypterAdapterInterface {
  constructor (private readonly secretKey: string) {}
  async encrypt (value: string): Promise<string> {
    return jwt.sign(value, this.secretKey)
  }
}
