import { object, string, ref } from 'yup';
import enTexts from '@translations/en.json';

export const passwordVerificationSchema = object().shape({
  password: string()
    .trim()
    .min(6, enTexts.errorMessages.shortPassword)
    .matches('.*\\d.*', enTexts.errorMessages.numberRequired)
    .required(enTexts.errorMessages.requiredPassword),
  confirmPassword: string()
    .trim()
    .required(enTexts.errorMessages.requiredConfirmPassword)
    .oneOf([ref('password')], enTexts.errorMessages.passwordNotMatched)
});
