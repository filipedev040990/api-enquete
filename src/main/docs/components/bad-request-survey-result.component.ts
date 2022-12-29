export const badRequestSurveyResultComponent = {
  description: 'Requisição inválida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  },
  example: {
    error: 'Invalid param: surveyId'
  }
}
