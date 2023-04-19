import CloseIcon from '@public/assets/icons/close';
import React, { useState } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import type { FormProps } from '..';

interface ImageInputProps {
  icon: React.ReactNode;
  label: string;
  name?: string;
  register: UseFormRegister<FormProps>;
  onChange: (file: File, label: string) => void;
}
const ImageInput = ({ icon, label, register, onChange }: ImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(() => URL.createObjectURL(file));
      onChange(file, label);
    }
  };

  return (
    <div className="relative flex h-[180px] w-[164px] items-center justify-center rounded-[10px] border border-dashed border-purple bg-purple-200 xxs:w-full xmd:w-full">
      {!preview ? (
        <label className="flex cursor-pointer flex-col items-center gap-2 text-sm font-medium text-purple">
          {icon}
          <input
            {...register(label, { required: true })}
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          {label}
        </label>
      ) : (
        <>
          <img
            src={preview}
            alt="preview-upload"
            className="absolute top-0 left-0 h-full max-h-[224px] w-full max-w-[540px] object-cover"
          />
          <button
            type="button"
            className="absolute top-0 right-0 z-10"
            onClick={() => setPreview(null)}
          >
            <CloseIcon color="#5A4CDB" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageInput;
