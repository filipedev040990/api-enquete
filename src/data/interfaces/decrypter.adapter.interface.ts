export interface DecrypterAdapterInterface {
  decrypt (value: string): Promise<string | object | null>
}
