export const notFoundComponent = {
  description: 'Recurso não encontrado.',
  content: {
    'application/json': {
      schema: {
        $ref: '#schemas/error'
      }
    }
  },
  example: {
    error: 'Not found'
  }
}
