import { IPokemonResponse } from '../types/pockemon';
import { client } from './fetchClient';

export const fetchPokemons = () => {
  return client.get<IPokemonResponse>('/pokemon');
};

export const fetchPokemonInfo = (pokemon: string) => {
  return client.get(`/pokemon-form/${pokemon}`);
};
