export const badRequestSurveyComponent = {
  description: 'Requisição inválida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  },
  example: {
    error: 'Missing param: answer'
  }
}
