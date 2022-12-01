import { HasherAdapterInterface } from '../../data/interfaces/hasher-adapter.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HasherAdapterInterface {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
