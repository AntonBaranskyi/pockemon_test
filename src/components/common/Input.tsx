import {
  ComponentPropsWithRef,
  ForwardRefRenderFunction,
  ReactElement,
} from 'react';

import cx from 'classnames';

import { forwardRef } from 'react';

interface InputProps extends ComponentPropsWithRef<'input'> {
  wrapperProps?: ComponentPropsWithRef<'div'>;
  wrapperClassName?: string;
  icon?: ReactElement;
  label: string;

  error?: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const { icon, wrapperClassName, error, label, ...otherProps } = props;

  return (
    <>
      <div className={cx('relative', wrapperClassName)}>
        {label}
        {icon && (
          <div
            className={cx('flex justify-start items-center', {
              'text-error': !!error,
            })}
            style={{
              position: 'absolute',
              left: '6px',
              top: error ? '50%' : '68%',
              transform: 'translateY(-50%)',
            }}
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className='h-[40px] px-[32px] py-[12px] border border-gray w-full'
          {...otherProps}
        ></input>

        {error && (
          <div className='text-red-400 text-left pt-1 text-sm'>{error}</div>
        )}
      </div>
    </>
  );
};

export default forwardRef(Input);
