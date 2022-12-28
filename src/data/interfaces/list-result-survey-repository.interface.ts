export interface ListResultSurveyRepositoryInterface {
  getBySurveyIdAndAccountId (surveyId: string, accountId: string): Promise<any>
}
