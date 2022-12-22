export const surveysSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/survey'
  },
  example: [{
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
  }]
}
