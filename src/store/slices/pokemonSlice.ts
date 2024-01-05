import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPokemons } from '../../api/pokemonsApi';
import { IPokemon } from '../../types/pockemon';

export const fetchedPokemon = createAsyncThunk(
  'pockemon/fetchAllPokemon',
  async () => {
    const response = await fetchPokemons();

    return response?.results;
  }
);

type State = {
  pokemons: IPokemon[];
};

const initialState: State = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    onClearPokemons: (state) => {
      state.pokemons = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchedPokemon.fulfilled,
      (state, action: PayloadAction<IPokemon[]>) => {
        state.pokemons = action.payload;
      }
    );
  },
});

export const { onClearPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
