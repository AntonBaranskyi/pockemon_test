import * as yup from 'yup';
import { errors } from '../../constansts/errors';

export const coachValidation = yup.object({
  firstName: yup
    .string()
    .required(errors.firstNameRequired)
    .min(2, errors.firstNameMin),
  lastName: yup
    .string()
    .required(errors.lastNameRequired)
    .min(3, errors.lastNameMin),
});
