import { AddSurveyRepositoryInterface } from '../../../../../data/interfaces/add-survey-repository.interface'
import { SurveyModel } from '../../../../../domain/models/survey.model'
import { MongoHelper } from '../../helpers/mongo.helper'

export class SurveyRepository implements AddSurveyRepositoryInterface {
  async create (survey: SurveyModel): Promise<void> {
    const surveysCollection = await MongoHelper.getCollection('surveys')
    await surveysCollection.insertOne(survey)
  }
}
