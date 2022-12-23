export const savesurveyAnswerchema = {
  type: 'object',
  properties: {
    accountId: {
      type: 'object',
      properties: {
        accountId: {
          type: 'string'
        }
      }
    },
    surveyId: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    id: {
      type: 'string'
    }
  },
  example: {
    accountId: {
      accountId: '6398e5d1c6408b0a2d7b7ea7'
    },
    surveyId: '639e6355cadd1d910fcd4c26',
    answer: 'Sim',
    date: '2022-12-21T20:51:27.111Z',
    id: '63a23323821a9b8cbcee4609'
  }
}
