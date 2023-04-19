/* eslint-disable import/no-extraneous-dependencies */
import StyleSelectSection from '@containers/pages/Template/StyleSelect';
import GalleryAddIcon from '@public/assets/icons/gallery-add';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ImageInput from './ImageInput';
import Select from './Select';
import TextField from './TextField';

export interface SelectedStyle {
  key: string;
  replacement?: Replacement;
}
export interface FormProps {
  [key: string]: string | File | null;
}

interface UploadPhotoFormProps {
  onSubmit: (values: FormProps) => void;
  imageInputs?: Replacement[];
  textInputs?: Replacement[];
  systemFileLayers?: Layer[];
  sizes: string[];
}

const UploadPhotoForm = ({
  onSubmit,
  sizes,
  systemFileLayers,
  textInputs,
  imageInputs,
}: UploadPhotoFormProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue } = useForm<FormProps>();
  const [chosenStyles, setChosenStyles] = useState<SelectedStyle[]>(
    () =>
      systemFileLayers?.map((layer) => ({
        key: layer.title,
        replacement: layer.replacements?.[0],
      })) ?? []
  );

  const handleSetImage = (file: File, label: string) => {
    setValue(label, file);
  };

  const handleChooseStyle = (style: SelectedStyle) => {
    const newChosenStyles = chosenStyles.map((chosenStyle) => {
      if (chosenStyle.key === style.key) {
        chosenStyle.replacement = style.replacement;
      }
      return chosenStyle;
    });

    setChosenStyles(newChosenStyles);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-4 flex w-full flex-col gap-14 lg:gap-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-wrap justify-start gap-4">
          {imageInputs?.map((replacement) => (
            <ImageInput
              icon={<GalleryAddIcon />}
              label={replacement.title}
              key={replacement.title}
              onChange={handleSetImage}
              register={register}
            />
          ))}
        </div>

        {textInputs?.map((input) => (
          <TextField
            key={input.title}
            title={input.title}
            placeholder={input.placeHolder}
            name={input.title}
            register={register}
          />
        ))}

        <Select
          options={sizes}
          title={t('image-size')}
          placeholder={t('select-size')}
          register={register}
        />
      </div>

      <button
        type="submit"
        className="h-[48px] w-full rounded-[6px] bg-purple font-medium text-white "
      >
        {t('create-photo')}
      </button>

      {!!systemFileLayers?.length && (
        <StyleSelectSection
          systemFileLayers={systemFileLayers}
          chosenStyles={chosenStyles}
          onChooseStyle={handleChooseStyle}
        />
      )}
    </form>
  );
};

export default UploadPhotoForm;
