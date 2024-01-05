import React from 'react';
import { ICoach } from '../../types/coach';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { onAddTabCoach } from '../../store/slices/otherSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

import cx from 'classnames';

type Props = {
  coach: ICoach;
};

export const CoachCard: React.FC<Props> = ({ coach }) => {
  const dispatch = useAppDispatch();
  const { activeTabCoach } = useAppSelector((state) => state.other);

  const handleTabCoach = () => {
    dispatch(onAddTabCoach(coach));
  };

  return (
    <div
      onClick={handleTabCoach}
      style={{borderColor:coach.lastName === activeTabCoach?.lastName ? 'red' : 'blue'}}
      className='h-12 px-3 bg-yellow-300 flex items-center justify-center rounded-full border-4 border-blue-500 cursor-pointer'
    >
      <p
      style={{color:coach.lastName === activeTabCoach?.lastName ? 'red' : 'blue'}}
        className={cx('font-bold', {
          'text-blue-500':true,
          'text-red-500': coach.lastName === activeTabCoach?.lastName,
        })}
      >{`${coach.firstName} ${coach.lastName}`}</p>
    </div>
  );
};
