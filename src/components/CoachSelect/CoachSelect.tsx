import Select from 'react-select';
import { useAppSelector } from '../../hooks/useAppSelector';
import { ICoach } from '../../types/coach';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { onAddCurrentUser } from '../../store/slices/otherSlice';
import { useTranslation } from 'react-i18next';

export const CoachSelect = () => {
  const { coaches } = useAppSelector((state) => state.coaches);
  const { currentUser } = useAppSelector((state) => state.other);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const getOptionalLabels = (option: ICoach) =>
    `${option.firstName} ${option.lastName}`;

  const groupedOptions = [
    {
      label: 'Coaches',
      options: coaches,
    },
  ];

  const onHandleCoachChange = (coach: any) => {
    dispatch(onAddCurrentUser(coach as ICoach));
  };

  return (
    <div className='relative flex items-center justify-center mb-10 gap-2'>
      {coaches.length > 0 ? (
        <>
          <h2 className='text-lg font-medium text-center '>
            {t('main.coach_choose')}
          </h2>
          <Select
            className='basic-single'
            options={groupedOptions}
            getOptionLabel={getOptionalLabels}
            getOptionValue={getOptionalLabels}
            isSearchable={false}
            placeholder='Choose your coach'
            value={currentUser}
            onChange={onHandleCoachChange}
            name='names'
          />
        </>
      ) : (
        <h2 className='text-lg font-medium text-center mb-10'>
          {t('main.coach_create')}
        </h2>
      )}
    </div>
  );
};
