export const signupParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  },
  required: ['email', 'name', 'password', 'passwordConfirmation'],
  example: {
    email: 'zedascouves@email.com.br',
    name: 'Zé das Couves',
    password: '123456789',
    passwordConfirmation: '123456789'
  }
}
