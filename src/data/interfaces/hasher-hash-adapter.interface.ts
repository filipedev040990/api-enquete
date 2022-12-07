export interface HasherHashAdapterInterface {
  hash(value: string): Promise<string>
}
