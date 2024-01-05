export interface IPokemon {
  name: string;
  url: string;
  id?: string;
}

export interface IPokemonResponse {
  count: number;
  next: string;
  results: IPokemon[];
}


