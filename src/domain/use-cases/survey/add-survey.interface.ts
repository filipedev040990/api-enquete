
export type AddSurveyRequest = {
  question: string
  answers: {
    image: string
    answer: string
  }
}

export interface AddSurveyUseCaseInterface {
  execute(survey: AddSurveyRequest): Promise<void>
}
