export const savesurveyAnswerchema = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string'
    },
    question: 'string',
    date: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    }
  },
  example: {
    surveyId: '63a45ae3cae58f6dd72907f2',
    question: 'Você já trabalhou com Node JS ?',
    date: '2022-12-22T13:25:55.548Z',
    answers: [
      {
        image: 'https://www.google.com/error.png',
        answer: 'Não',
        count: 2,
        percent: 66.66666666666666
      },
      {
        image: 'https://www.google.com/check.png',
        answer: 'Sim',
        count: 1,
        percent: 33.33333333333333
      }
    ]
  }
}
