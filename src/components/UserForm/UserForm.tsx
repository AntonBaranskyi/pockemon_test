import React from 'react';

import person from '../../assets/icons/person.png';
import Input from '../common/Input';
import { Button } from '../common/Button';
import { useForm, FieldValues } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { onAddCoach } from '../../store/slices/coachSlice';
import { ICoach } from '../../types/coach';
import { useAppSelector } from '../../hooks/useAppSelector';
import { coachValidation } from '../../utils/schema/coachValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { onAddCurrentUser } from '../../store/slices/otherSlice';
import { useTranslation } from 'react-i18next';

export const UserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(coachValidation),
    mode: 'onBlur',
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { coaches } = useAppSelector((state) => state.coaches);

  const onSubmit = (data: FieldValues) => {
    console.log('submit');

    const isCoachAlreadyExist = coaches.some(
      (coach) => coach.lastName === data.lastName
    );

    if (isCoachAlreadyExist) {
      setError('lastName', {
        type: 'custom',
        message: 'This coach is already exist',
      });
    } else {
      dispatch(onAddCoach({ ...data, pokemons: [] } as ICoach));

      dispatch(onAddCurrentUser({ ...data, pokemons: [] } as ICoach));

      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='col-span-2 rounded-[10px] px-12 py-5 shadow-lg flex flex-col'
    >
      <div className='flex items-center justify-center gap-3 mb-5'>
        <img src={person} alt='person' className='h-[50px] w-[50px]' />
        <h3 className='text-lg'>  {t('main.coach_add')}</h3>
      </div>
      <Input
        type='text'
        placeholder={t('main.coach_first_placeholder')}
        label={t('main.coach_first')}
        icon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
            />
          </svg>
        }
        {...register('firstName')}
        error={errors?.firstName?.message as string}
      />

      <Input
        type='text'
        placeholder={t('main.coach_second_placeholder')}
        label={t('main.coach_second')}
        wrapperClassName='mt-2 mb-5'
        icon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
            />
          </svg>
        }
        {...register('lastName')}
        error={errors?.lastName?.message as string}
      />
      <Button
        label={t('main.coach_save')}
        className='bg bg-blue-500 rounded text-white'
        type='submit'
        disabled={!isValid}
      />
    </form>
  );
};
