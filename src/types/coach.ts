import { IPokemon } from './pockemon';

export interface ICoach {
  firstName: string;
  lastName: string;

  pokemons: IPokemon[] | [];
}
