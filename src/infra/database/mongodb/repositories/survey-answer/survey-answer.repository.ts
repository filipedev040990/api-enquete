import { SaveSurveyAnswerRepositoryInterface } from '@/data/interfaces/save-survey-answer-repository.interface'
import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyAnswerModel } from '@/domain/use-cases/survey-answer/save-survey-answer.interface'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../../helpers/mongo.helper'
import round from 'mongo-round'
import { QueryBuilder } from '../../helpers/query-builder'

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
    const surveyResult = await this.getBySurveyIdAndAccountId(data.surveyId, data.accountId)
    return surveyResult
  }

  private async getBySurveyIdAndAccountId (surveyId: string, accountId: string): Promise<any> {
    const surveyAnswerCollection = await MongoHelper.getCollection('surveyAnswer')
    const query = new QueryBuilder()
      .match({
        surveyId: new ObjectId(surveyId)
      })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      })
      .unwind({
        path: '$data'
      })
      .lookup({
        from: 'surveys',
        foreignField: '_id',
        localField: 'data.surveyId',
        as: 'survey'
      })
      .unwind({
        path: '$survey'
      })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$total',
          answer: '$data.answer',
          answers: '$survey.answers'
        },
        count: {
          $sum: 1
        },
        currentAccountAnswer: {
          $push: {
            $cond: [{ $eq: ['$data.accountId', accountId] }, '$data.answer', '$invalid']
          }
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $map: {
            input: '$_id.answers',
            as: 'item',
            in: {
              $mergeObjects: ['$$item', {
                count: {
                  $cond: {
                    if: {
                      $eq: ['$$item.answer', '$_id.answer']
                    },
                    then: '$count',
                    else: 0
                  }
                },
                percent: {
                  $cond: {
                    if: {
                      $eq: ['$$item.answer', '$_id.answer']
                    },
                    then: {
                      $multiply: [{
                        $divide: ['$count', '$_id.total']
                      }, 100]
                    },
                    else: 0
                  }
                },
                isCurrentAccountAnswerCount: {
                  $cond: [{
                    $eq: ['$$item.answer', {
                      $arrayElemAt: ['$currentAccountAnswer', 0]
                    }]
                  }, 1, 0]
                }
              }]
            }
          }
        }
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answers'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $reduce: {
            input: '$answers',
            initialValue: [],
            in: {
              $concatArrays: ['$$value', '$$this']
            }
          }
        }
      })
      .unwind({
        path: '$answers'
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date',
          answer: '$answers.answer',
          image: '$answers.image'
        },
        count: {
          $sum: '$answers.count'
        },
        percent: {
          $sum: '$answers.percent'
        },
        isCurrentAccountAnswerCount: {
          $sum: '$answers.isCurrentAccountAnswerCount'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answer: {
          answer: '$_id.answer',
          image: '$_id.image',
          count: round('$count'),
          percent: round('$percent'),
          isCurrentAccountAnswer: {
            $eq: ['$isCurrentAccountAnswerCount', 1]
          }
        }
      })
      .sort({
        'answer.count': -1
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answer'
        }
      })
      .project({
        _id: 0,
        surveyId: {
          $toString: '$_id.surveyId'
        },
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'
      })
      .build()
    const surveyResult = await surveyAnswerCollection.aggregate<SurveyResultModel>(query).toArray()
    return surveyResult.length ? surveyResult[0] : null
  }
}
