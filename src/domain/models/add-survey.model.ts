export type Answer = {
  image?: string
  answer: string
}
export type AddSurveyModel = {
  question: string
  answers: Answer []
  date: Date
}
