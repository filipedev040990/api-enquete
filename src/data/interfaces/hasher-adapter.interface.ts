export interface HasherAdapterInterface {
  hash(value: string): Promise<string>
  compare (value: string, valueToCompare: string): Promise<boolean>
}
