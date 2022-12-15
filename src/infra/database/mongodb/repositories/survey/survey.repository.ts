import { AddSurveyRepositoryInterface } from '../../../../../data/interfaces/add-survey-repository.interface'
import { ListAllSurveysRepositoryInterface } from '../../../../../data/interfaces/list-all-surveys-repository.interface'
import { AddSurveyModel } from '../../../../../domain/models/add-survey.model'
import { SurveyModel } from '../../../../../domain/models/survey.model'
import { MongoHelper } from '../../helpers/mongo.helper'

export class SurveyRepository implements AddSurveyRepositoryInterface, ListAllSurveysRepositoryInterface {
  async create (survey: AddSurveyModel): Promise<void> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.insertOne(survey)
  }

  async listAll (): Promise<SurveyModel[]> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    const surveys: any = await surveysCollection.find().toArray()
    return surveys
  }
}
