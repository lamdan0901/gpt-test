import DownChevronIcon from '@public/assets/icons/down-chevron';
import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import type { FormProps } from '..';

interface SelectOptionsProps {
  options: string[];
  title: string;
  placeholder: string;
  register: UseFormRegister<FormProps>;
}

const Select = ({
  options,
  placeholder,
  title,
  register,
}: SelectOptionsProps) => {
  return (
    <div>
      <label className="inset-y-0 mb-2 block font-medium text-gray-500">
        {title}
      </label>

      <div className="relative">
        <select
          {...register('size')}
          className="focus:shadow-outline block w-full appearance-none rounded-lg border border-gray-250 bg-white px-4 py-3 pr-8 leading-tight  hover:border-gray-400 focus:outline-none"
        >
          <option className="text-gray-900" value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option.split('_').slice(1).join('x')}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2">
          <DownChevronIcon />
        </div>
      </div>
    </div>
  );
};

export default Select;
