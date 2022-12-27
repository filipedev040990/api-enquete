export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: Answer []
  date: Date
}

type Answer = {
  image?: string
  answer: string
  count: number
  percent: number
}
