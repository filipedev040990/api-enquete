import { HasherHashAdapterInterface } from '@/data/interfaces/hasher-hash-adapter.interface'
import bcrypt from 'bcrypt'
import { HasherCompareAdapterInterface } from '@/data/interfaces/hasher-compare-adapter.interface'

export class BcryptAdapter implements HasherHashAdapterInterface, HasherCompareAdapterInterface {
  constructor (private readonly salt: number) {}
  async compare (value: string, valueToCompare: string): Promise<boolean> {
    return await bcrypt.compare(value, valueToCompare)
  }

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
