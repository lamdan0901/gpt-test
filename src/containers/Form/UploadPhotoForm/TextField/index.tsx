import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import type { FormProps } from '..';

interface TextFieldProps {
  title: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FormProps>;
}

const TextField = ({ title, placeholder, name, register }: TextFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-2 block font-medium text-gray-500">
        {title}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-250 px-4 py-3 text-gray-800 placeholder:text-gray-350"
        {...register(name, { required: true })}
      />
    </div>
  );
};

export default TextField;
