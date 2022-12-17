import { ServerError } from '@/presentation/errors/server.error'
import { HttpResponse } from '@/presentation/interfaces/http.interface'

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

export const resourceConflict = (message: string): HttpResponse => ({
  statusCode: 409,
  body: message
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error.message
})
