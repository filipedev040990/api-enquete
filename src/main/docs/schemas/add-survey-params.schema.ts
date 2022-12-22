export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    answer: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    }
  },
  example: {
    question: 'Você já trabalhou com Node JS ?',
    answers: [
      {
        image: 'https://www.google.com/check.png',
        answer: 'Sim'
      },
      {
        image: 'https://www.google.com/error.png',
        answer: 'Não'
      }
    ]
  }
}
