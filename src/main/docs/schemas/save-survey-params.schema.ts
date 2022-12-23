export const saveSurveyAnswerParamsSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    }
  },
  required: ['answer'],
  example: {
    answer: 'Sim'
  }
}
