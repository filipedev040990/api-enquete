import { ServerError } from '../errors/server.error'
import { HttpResponse } from '../interfaces/http.interface'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const success = (body: any, statusCode = 200): HttpResponse => ({
  statusCode,
  body
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: {
    message: 'Unauthorized'
  }
})
