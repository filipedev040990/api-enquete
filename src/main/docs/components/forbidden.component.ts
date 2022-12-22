export const forbiddenComponent = {
  description: 'Acesso negado',
  content: {
    'application/json': {
      schema: {
        $ref: '#schemas/error'
      }
    }
  },
  example: {
    error: 'Access denied'
  }
}
