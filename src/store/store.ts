import { configureStore } from '@reduxjs/toolkit';
import coaches from './slices/coachSlice';
import pokemon from './slices/pokemonSlice';
import other from './slices/otherSlice';

export const store = configureStore({
  reducer: {
    coaches,
    pokemon,
    other,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
