export type TokenRepositoryProps = {
  account_id: string
  token: string
}

export interface TokenRepositoryInterface {
  createOrUpdate (props: TokenRepositoryProps): Promise<void>
}
