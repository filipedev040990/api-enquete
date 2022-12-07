export type AuthenticationRequest = {
  email: string
  password: string
}
export interface AuthenticationUseCaseInterface {
  execute (request: AuthenticationRequest): Promise<string | null>
}
