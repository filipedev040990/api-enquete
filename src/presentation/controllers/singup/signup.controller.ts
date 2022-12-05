import { AuthenticationUseCaseInterface } from '../../../data/use-cases/authentication'
import { AddAccountInterface } from '../../../domain/use-cases/signup/add-account.interface'
import { GetAccountByEmailInterface } from '../../../domain/use-cases/signup/get-account-by-email.interface'
import { badRequest, resourceConflict, serverError, success } from '../../helpers/http.helper'
import { ControllerInterface, HttpRequest, HttpResponse, ValidationInterface } from '../../interfaces'

export default class SignupController implements ControllerInterface {
  constructor (
    private readonly addAccount: AddAccountInterface,
    private readonly validation: ValidationInterface,
    private readonly getAccountByEmail: GetAccountByEmailInterface,
    private readonly authenticationUseCase: AuthenticationUseCaseInterface
  ) {}

  async execute (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = request.body

      const accountExists = await this.getAccountByEmail.execute(email)

      if (accountExists) {
        return resourceConflict('This email already in use')
      }

      const newAccount = await this.addAccount.execute({
        name,
        email,
        password
      })

      if (newAccount) {
        const token = await this.authenticationUseCase.execute({
          email: newAccount.email,
          password
        })

        return success({
          name: newAccount.name,
          token
        }, 201)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
