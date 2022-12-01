import { HasherHashAdapterInterface } from '../../data/interfaces/hasher-hash-adapter.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HasherHashAdapterInterface {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
