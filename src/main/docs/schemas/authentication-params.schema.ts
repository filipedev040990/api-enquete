export const authenticationParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['email', 'password'],
  example: {
    email: 'zedascouves@email.com.br',
    password: '123456789'
  }
}
