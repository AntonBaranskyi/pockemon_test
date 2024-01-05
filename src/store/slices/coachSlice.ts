import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoach } from '../../types/coach';
import { IPokemon } from '../../types/pockemon';

type State = {
  coaches: ICoach[];
};

const initialState: State = {
  coaches: [],
};

const coachSlice = createSlice({
  name: 'coachSlice',
  initialState,
  reducers: {
    onAddCoach: (state, action: PayloadAction<ICoach>) => {
      state.coaches = [...state.coaches, action.payload];
    },

    onAddCoachPokemons: (
      state,
      action: PayloadAction<{ id: string; pokemons: IPokemon[] }>
    ) => {
      const coachIndex = state.coaches.findIndex(
        (coach) => coach.lastName === action.payload.id
      );

      if (coachIndex !== -1) {
        const updatePokemons = action.payload.pokemons.map((pokemon) => ({
          ...pokemon,
          id: pokemon.url.slice(-2).slice(0, 1),
        }));

        const updatedCoach = {
          ...state.coaches[coachIndex],
          pokemons: [...updatePokemons],
        };

        state.coaches = [
          ...state.coaches.slice(0, coachIndex),
          updatedCoach,
          ...state.coaches.slice(coachIndex + 1),
        ];
      }
    },
  },
});

export const { onAddCoach, onAddCoachPokemons } = coachSlice.actions;

export default coachSlice.reducer;
