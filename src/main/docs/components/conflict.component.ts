export const conflictComponent = {
  description: 'O e-mail fornecido já está em uso.',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  },
  example: {
    error: 'This email already in use'
  }
}
