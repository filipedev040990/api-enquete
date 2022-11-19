import { AddAccountUseCase } from '../../data/use-cases/add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountRepository } from '../../infra/database/mongodb/repositories/account.repository'
import SignupController from '../../presentation/controllers/singup/signup.controller'
import { EmailValidatorAdapter } from '../../shared/email-validator.adapter'

export const makeSignupControler = (): SignupController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const accountRepository = new AccountRepository()
  const addAccount = new AddAccountUseCase(encrypter, accountRepository)
  return new SignupController(emailValidator, addAccount)
}
