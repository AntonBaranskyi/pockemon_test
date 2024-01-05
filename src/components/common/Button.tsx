import React, { ComponentPropsWithoutRef, ReactElement } from 'react';

import cx from 'classnames';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label?: string;
  loading?: boolean;
  icon?: ReactElement;
  customBgColor?: string;
  nextIcon?: ReactElement;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  label,
  disabled,
  icon,
  nextIcon,
  ...otherProps
}) => {
  return (
    <button
      className={cx(
        'flex justify-center items-center px-10 py-3 disabled:bg-gray-500',
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      <div className='flex items-center gap-3'>
        {icon && <div className='flex items-center'>{icon}</div>}
        {children || label}
        {nextIcon && <div className='flex items-center'>{nextIcon}</div>}
      </div>
    </button>
  );
};
