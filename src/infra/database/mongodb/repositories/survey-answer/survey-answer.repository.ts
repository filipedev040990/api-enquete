import { SaveSurveyAnswerRepositoryInterface } from '@/data/interfaces/save-survey-answer-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyAnswerModel } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../../helpers/mongo.helper'

export class SurveyAnswerRepository implements SaveSurveyAnswerRepositoryInterface {
  async save (data: SaveSurveyAnswerModel): Promise<SurveyResultModel> {
    const surveyAnswerCollection = await MongoHelper.getCollection('surveyAnswer')
    await surveyAnswerCollection.findOneAndUpdate(
      {
        surveyId: new ObjectId(data.surveyId),
        accountId: data.accountId
      },
      {
        $set: {
          answer: data.answer,
          date: data.date
        }

      },
      {
        upsert: true
      }
    )
    const surveyResult = await this.getBySurveyId(data.surveyId)
    return surveyResult
  }

  private async getBySurveyId (surveyId: string): Promise<any> {
    const surveyAnswerCollection = await MongoHelper.getCollection('surveyAnswer')
    const query = surveyAnswerCollection.aggregate([{
      $match: {
        surveyId: new ObjectId(surveyId)
      }
    }, {
      $group: {
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        count: {
          $sum: 1
        }
      }
    }, {
      $unwind: {
        path: '$data'
      }

    }, {
      $lookup: {
        from: 'surveys',
        foreignField: '_id',
        localField: 'data.surveyId',
        as: 'survey'
      }
    }, {
      $unwind: {
        path: '$survey'
      }
    }, {
      $group: {
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$count',
          answer: {
            $filter: {
              input: '$survey.answers',
              as: 'item',
              cond: {
                $eq: ['$$item.answer', '$data.answer']
              }
            }
          }
        },
        count: {
          $sum: 1
        }
      }
    }, {
      $unwind: {
        path: '$_id.answer'
      }
    }, {
      $addFields: {
        '_id.answer.count': '$count',
        '_id.answer.percent': {
          $multiply: [{
            $divide: ['$count', '$_id.total']
          }, 100]

        }
      }
    }, {
      $group: {
        _id: {
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date'
        },
        answers: {
          $push: '$_id.answer'
        }
      }
    }, {
      $project: {
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'
      }
    }])

    const surveyResult = await query.toArray()
    return surveyResult?.length ? surveyResult[0] : null
  }
}
