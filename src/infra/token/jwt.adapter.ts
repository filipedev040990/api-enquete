import jwt from 'jsonwebtoken'
import { DecrypterAdapterInterface } from '../../data/interfaces/decrypter.adapter.interface'
import { EncrypterAdapterInterface } from '../../data/interfaces/encrypter.adapter.interface'
import env from '../../main/env'

export class JwtAdapter implements EncrypterAdapterInterface, DecrypterAdapterInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expiresIn?: string
  ) {}

  async encrypt (payload: object): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn || env.encrypter.expiresIn })
  }

  async decrypt (token: string): Promise<string | object | null> {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      return null
    }
  }
}
