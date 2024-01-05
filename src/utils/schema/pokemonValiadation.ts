import * as yup from 'yup';
import { errors } from '../../constansts/errors';

export const pokemonValidation = yup.object({
  pokemon: yup
    .array()
    .test('is-length-4', errors.pokemonLength, (value) => {
      return value?.length === 4;
    })
    .required(errors.pokemonReq),
});
