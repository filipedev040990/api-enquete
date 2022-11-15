export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`Invalid param error: ${param}`)
    this.name = 'InvalidParamError'
  }
}
