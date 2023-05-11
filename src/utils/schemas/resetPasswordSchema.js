import { object, string } from 'yup';
import enTexts from '@translations/en.json';

export const resetPasswordSchema = object().shape({
  emailInput: string()
    .trim()
    .email(enTexts.errorMessages.invalidEmail)
    .required(enTexts.errorMessages.requiredEmail)
});
