export interface EmailValidatorInterface {
  execute (email: string): Promise<boolean>
}
