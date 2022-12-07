export interface EncrypterAdapterInterface {
  encrypt (payload: object): Promise<string>
}
