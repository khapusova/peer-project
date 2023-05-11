import { string, object } from 'yup';
import enTexts from '@translations/en.json';

export const personalInfoSchema = object().shape({
  phone: string()
    .min(20, enTexts.errorMessages.invalidPhone)
    .max(20, enTexts.errorMessages.invalidPhone)
    .required(enTexts.errorMessages.phoneRequired),
  website: string().url(),
  linkedIn: string().url(),
  orcid: string().url()
});
