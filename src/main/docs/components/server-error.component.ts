export const serverErrorComponent = {
  description: 'Erro interno do servidor.',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  },
  example: {
    error: 'Internal server error'
  }
}
