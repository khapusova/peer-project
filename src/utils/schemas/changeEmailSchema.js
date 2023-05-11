import { object, string } from 'yup';
import enTexts from '@translations/en.json';

export const changeEmailSchema = object().shape({
  password: string()
    .trim()
    .min(6, enTexts.errorMessages.shortPassword)
    .matches('.*\\d.*', enTexts.errorMessages.numberRequired)
    .required(enTexts.errorMessages.requiredPassword),
  oldEmail: string()
    .trim()
    .email(enTexts.errorMessages.invalidEmail)
    .required(enTexts.errorMessages.requiredEmail),
  newEmail: string()
    .trim()
    .email(enTexts.errorMessages.invalidEmail)
    .required(enTexts.errorMessages.requiredEmail)
});
