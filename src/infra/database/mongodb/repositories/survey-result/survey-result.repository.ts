import { SaveSurveyResultRepositoryInterface } from '@/data/interfaces/save-survey-result-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultModel } from '@/domain/use-cases/survey/save-survey-result.interface'
import { map } from '../../helpers/mapping.helper'
import { MongoHelper } from '../../helpers/mongo.helper'

export class SurveyResultRepository implements SaveSurveyResultRepositoryInterface {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId
      },
      {
        $set: {
          answer: data.answer,
          date: data.date
        }

      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return map(res.value)
  }
}
