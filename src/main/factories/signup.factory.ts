import { AddAccountUseCase } from '../../data/use-cases/add-account/add-account.usecase'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../infra/database/mongodb/repositories/account.repository'
import { LogRepository } from '../../infra/database/mongodb/repositories/log.repository'
import SignupController from '../../presentation/controllers/singup/signup.controller'
import { ControllerInterface } from '../../presentation/interfaces'
import { EmailValidatorAdapter } from '../../shared/email-validator.adapter'
import { LogControllerDecorator } from '../decorators/log.decorator'

export const makeSignupControler = (): ControllerInterface => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  const addAccount = new AddAccountUseCase(encrypter, accountRepository)
  const signupController = new SignupController(emailValidator, addAccount)
  const logRepository = new LogRepository()
  return new LogControllerDecorator(signupController, logRepository)
}
