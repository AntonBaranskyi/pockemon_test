import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import pokemon from '../../assets/icons/pokemon.png';
import { useEffect, useRef } from 'react';
import {
  fetchedPokemon,
  onClearPokemons,
} from '../../store/slices/pokemonSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Button } from '../common/Button';

import { useForm, Controller } from 'react-hook-form';
import { pokemonValidation } from '../../utils/schema/pokemonValiadation';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPokemon } from '../../types/pockemon';
import { onAddCoachPokemons } from '../../store/slices/coachSlice';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  pokemon: [],
};

export const PokemonForm = () => {
  const { pokemons } = useAppSelector((state) => state.pokemon);
  const { currentUser } = useAppSelector((state) => state.other);
  const dispatch = useAppDispatch();

  const selectRef = useRef(null);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(pokemonValidation),
    mode: 'onBlur',
  });

  useEffect(() => {
    dispatch(fetchedPokemon());
  }, []);

  const onHandleSubmit = (data: { pokemon: IPokemon[] }) => {
    console.log('submit');

    dispatch(
      onAddCoachPokemons({
        id: currentUser?.lastName as string,
        pokemons: data.pokemon,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className='col-span-2 rounded-[10px] px-12 py-5 shadow-lg flex flex-col relative'
    >
      <div className='flex items-center justify-center gap-3 mb-5'>
        <img src={pokemon} alt='person' className='h-[50px] w-[50px]' />
        {currentUser ? (
          <h3 className='text-lg'>{t('main.pokemon_fight')}</h3>
        ) : (
          <h3 className='text-lg'>{t('main.pokemon_label')}</h3>
        )}
      </div>

      {currentUser && (
        <>
          <div className='mb-[119px]'>
            <Controller
              name='pokemon'
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  isMulti
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.name}
                  onInputChange={(e, action) => console.log(e, action)}
                  // onChange={(value, action) => {
                  //   console.log(value);
                  //   console.log(action);
                  // }}
                  onChange={onChange}
                  isSearchable
                  name='pokemon'
                  options={pokemons}
                  ref={selectRef}
                  closeMenuOnSelect
                  isClearable
                />
              )}
            />
            {errors?.pokemon?.message && (
              <div className='text-red-500'>{errors.pokemon.message}</div>
            )}
          </div>

          <Button
            label={t('main.pokemon_save')}
            className='bg bg-red-500 text-white rounded'
            type='submit'
            disabled={!isValid}
          />
        </>
      )}
    </form>
  );
};
