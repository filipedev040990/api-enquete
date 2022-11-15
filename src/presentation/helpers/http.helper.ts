import { ServerError } from '../errors/server.error'
import { HttpResponse } from '../interfaces/http.interface'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const success = (body: any, statusCode = 200): HttpResponse => ({
  statusCode,
  body
})
