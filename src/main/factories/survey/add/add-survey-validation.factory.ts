import { ValidationInterface } from '../../../../presentation/interfaces'
import { RequiredFieldsValidation, ValidationComposite } from '../../../../presentation/validators'

export const makeAddSurveyValidationComposite = (): ValidationComposite => {
  const validations: ValidationInterface [] = []
  for (const fieldName of ['question', 'answers']) {
    validations.push(new RequiredFieldsValidation(fieldName))
  }
  return new ValidationComposite(validations)
}
