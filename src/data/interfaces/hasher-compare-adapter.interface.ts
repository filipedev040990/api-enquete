export interface HasherCompareAdapterInterface {
  compare (value: string, valueToCompare: string): Promise<boolean>
}
