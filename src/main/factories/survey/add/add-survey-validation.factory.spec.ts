import { ValidationInterface } from '../../../../presentation/interfaces'
import { RequiredFieldsValidation, ValidationComposite } from '../../../../presentation/validators'
import { makeAddSurveyValidationComposite } from './add-survey-validation.factory'

jest.mock('../../../../presentation/validators/validation.composite')

describe('SurveyValidation', () => {
  test('should call SurveyFactory call Validation all validations', async () => {
    makeAddSurveyValidationComposite()
    const validations: ValidationInterface [] = []
    for (const fieldName of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidation(fieldName))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
