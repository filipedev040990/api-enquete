import { AddAccountUseCase } from '../../data/use-cases/add-account/add-account.usecase'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../infra/database/mongodb/repositories/account.repository'
import { LogRepository } from '../../infra/database/mongodb/repositories/log.repository'
import SignupController from '../../presentation/controllers/singup/signup.controller'
import { ControllerInterface } from '../../presentation/interfaces'
import { LogControllerDecorator } from '../decorators/log.decorator'
import { makeValidationComposite } from './signup-validation.factory'

export const makeSignupControler = (): ControllerInterface => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  const addAccount = new AddAccountUseCase(encrypter, accountRepository)
  const signupController = new SignupController(addAccount, makeValidationComposite())
  const logRepository = new LogRepository()
  return new LogControllerDecorator(signupController, logRepository)
}
