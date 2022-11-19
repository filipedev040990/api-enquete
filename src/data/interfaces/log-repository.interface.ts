export interface LogRepositoryInterface {
  log (stack: string): Promise<void>
}
