import { object, string } from 'yup';
import enTexts from '@translations/en.json';

export const signInSchema = object().shape({
  emailInput: string()
    .trim()
    .email(enTexts.errorMessages.invalidEmail)
    .required(enTexts.errorMessages.requiredEmail),
  passwordInput: string()
    .trim()
    .min(6, enTexts.errorMessages.shortPassword)
    .required(enTexts.errorMessages.requiredPassword)
});
