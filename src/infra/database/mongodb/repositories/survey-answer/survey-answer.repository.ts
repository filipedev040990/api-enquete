import { SaveSurveyAnswerRepositoryInterface } from '@/data/interfaces/save-survey-answer-repository.interface'
import { SurveyAnswerModel } from '@/domain/models/survey-answer.model'
import { SaveSurveyAnswerModel } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { map } from '../../helpers/mapping.helper'
import { MongoHelper } from '../../helpers/mongo.helper'

export class SurveyAnswerRepository implements SaveSurveyAnswerRepositoryInterface {
  async save (data: SaveSurveyAnswerModel): Promise<SurveyAnswerModel> {
    const surveyAnswerCollection = await MongoHelper.getCollection('surveyAnswer')
    const res = await surveyAnswerCollection.findOneAndUpdate(
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
