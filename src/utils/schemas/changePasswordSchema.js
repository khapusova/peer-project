import { object, string, ref } from 'yup';
import enTexts from '@translations/en.json';

export const changePasswordSchema = object().shape({
  oldPassword: string()
    .trim()
    .min(6, enTexts.errorMessages.shortPassword)
    .matches('.*\\d.*', enTexts.errorMessages.numberRequired)
    .required(enTexts.errorMessages.requiredPassword),
  newPassword: string()
    .trim()
    .min(6, enTexts.errorMessages.shortPassword)
    .matches('.*\\d.*', enTexts.errorMessages.numberRequired)
    .required(enTexts.errorMessages.requiredPassword),
  confirmPassword: string()
    .trim()
    .min(6, enTexts.errorMessages.shortPassword)
    .matches('.*\\d.*', enTexts.errorMessages.numberRequired)
    .required(enTexts.errorMessages.requiredPassword)
    .oneOf([ref('newPassword')], enTexts.errorMessages.passwordNotMatched)
});
