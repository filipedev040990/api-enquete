export interface EncrypterAdapterInterface {
  hash(value: string): Promise<string>
}
