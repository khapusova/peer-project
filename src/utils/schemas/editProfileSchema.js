import { object, string } from 'yup';
import enTexts from '@translations/en.json';

export const editProfileSchema = object().shape({
  firstName: string().trim().required(enTexts.errorMessages.requiredFirstName),
  lastName: string().trim().required(enTexts.errorMessages.requiredLastName),
  country: string().trim().required(enTexts.errorMessages.requiredCountry),
  institution: string()
    .trim()
    .required(enTexts.errorMessages.requiredInstitution),
  researchField: string()
    .trim()
    .required(enTexts.errorMessages.requiredResearchField),
  position: string().trim(),
  bio: string().trim()
});
