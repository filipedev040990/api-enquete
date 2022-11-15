import { EncrypterAdapterInterface } from '../../data/interfaces/encrypter-adapter.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements EncrypterAdapterInterface {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return null
  }
}
