export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answer: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    },
    date: {
      type: 'string'
    }
  },
  example: {
    id: '12345678910',
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
