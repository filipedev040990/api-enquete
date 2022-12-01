export type TokenRepositoryProps = {
  account_id: string
  token: string
}

export interface TokenRepositoryInterface {
  save (props: TokenRepositoryProps): Promise<void>
}
