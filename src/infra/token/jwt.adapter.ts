import jwt from 'jsonwebtoken'
import { EncrypterAdapterInterface } from '../../data/interfaces/encrypter.adapter.interface'
import env from '../../main/env'

export class JwtAdapter implements EncrypterAdapterInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expiresIn?: string
  ) {}

  async encrypt (payload: object): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn || env.encrypter.expiresIn })
  }
}
