import { object, string } from 'yup';
import enTexts from '@translations/en.json';

export const signUpSchema = object().shape({
  firstName: string().trim().required(enTexts.errorMessages.requiredFirstName),
  lastName: string().trim().required(enTexts.errorMessages.requiredLastName),
  emailInstitution: string()
    .trim()
    .email(enTexts.errorMessages.invalidEmail)
    .required(enTexts.errorMessages.requiredEmail)
});
