import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import cx from 'classnames';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  onAddTabCoach,
  onToggleModalState,
} from '../../store/slices/otherSlice';

import person from '../../assets/icons/pokemon_modal.png';
import { CoachCard } from '../CoachCard';
import { PokemonCard } from '../PokemonCard';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Button } from '../common/Button';
import { useTranslation } from 'react-i18next';

export const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { coaches } = useAppSelector((state) => state.coaches);
  const { activeTabCoach } = useAppSelector((state) => state.other);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(onAddTabCoach(coaches[0]));
  }, []);

  const handleClose = () => {
    dispatch(onToggleModalState(false));
  };

  return (
    <div className='fixed top-0 left-0 z-30 w-full h-full overflow-auto'>
      <div
        className={cx('w-full h-full bg-black/80', 'fixed top-0 left-0 z-10')}
        onClick={handleClose}
      />
      <div
        className={cx(
          'max-w-[600px] w-full bg-white rounded-[10px] py-8 px-8',
          'absolute left-1/2 -translate-x-1/2 ',
          'animate-pop-up',
          'relative z-20'
        )}
      >
        <div className='flex items-center justify-center gap-3 mb-3'>
          <h3 className='uppercase font-bold'>{t('modal.modal_title')}</h3>
          <img src={person} alt='person' className='h-[50px] w-[50px]' />
        </div>

        <div className='flex gap-3 mb-8'>
          {coaches.map((coach) => (
            <CoachCard key={coach.lastName} coach={coach} />
          ))}
        </div>

        <div className='flex flex-col gap-3 items-center mb-5'>
          {activeTabCoach?.pokemons.map((pokemon, i) => (
            <PokemonCard pokemon={pokemon} num={i} key={uuidv4()} />
          ))}
        </div>

        <div className='flex justify-center'>
          <Button
            label={t('modal.modal_back')}
            className='rounded bg-red-500 text-white'
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
};
