export type TokenRepositoryProps = {
  account_id: string
  token: string
}

export interface TokenRepositoryInterface {
  updateToken (props: TokenRepositoryProps): Promise<void>
}
