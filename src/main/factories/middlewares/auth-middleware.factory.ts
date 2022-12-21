import { AuthMiddlewareInterface } from '@/presentation/interfaces/middleware.interface'
import { AuthMiddleware } from '@/presentation/middlewares/auth.middleware'
import { makeGetAccountByTokenUseCaseFactory } from '../usecases'

export const makeAuthMiddleware = (role?: string): AuthMiddlewareInterface => {
  return new AuthMiddleware(makeGetAccountByTokenUseCaseFactory(), role)
}
