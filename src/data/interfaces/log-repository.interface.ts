export interface LogRepositoryInterface {
  logError (stack: string): Promise<void>
}
