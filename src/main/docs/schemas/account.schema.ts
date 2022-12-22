export const accountSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string'
    },
    expiresIn: {
      type: 'string'
    }
  },
  example: {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MTcwNTg4NywiaWF0IjoxNjcxNzA1ODg3fQ._rpS2AjBKCh3m742joqFHH4Pe2u46YegoHsoEtYReJU',
    expiresIn: '1703241952'
  }

}
