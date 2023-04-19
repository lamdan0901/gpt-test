import Tabs from '@component/Tabs';
import SearchForm from '@containers/Form/SearchForm';
import type { SelectedStyle } from '@containers/Form/UploadPhotoForm';
import clsx from 'clsx';
import getConfig from 'next/config';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { publicRuntimeConfig } = getConfig();

interface StyleSelectSectionProps {
  systemFileLayers?: Layer[];
  chosenStyles: SelectedStyle[];
  onChooseStyle: (style: SelectedStyle) => void;
}

interface StyleSelectProps {
  title: string;
  replacements: Replacement[];
  chosenStyles: SelectedStyle[];
  onChooseStyle: (style: SelectedStyle) => void;
}

const StylesSelect = ({
  title,
  replacements,
  chosenStyles,
  onChooseStyle,
}: StyleSelectProps) => {
  const isChosen = (replacement: Replacement) =>
    chosenStyles.some(
      (style) =>
        style.key === title && style.replacement?.value === replacement.value
    );

  return (
    <div className="my-4 grid h-[100%] max-h-[630px] w-full grid-cols-1 gap-4 overflow-auto xs:grid-cols-2 md:max-h-[330px] lg:grid-cols-4">
      {replacements.map((replacement) => (
        <button
          key={replacement.layerName}
          type="button"
          className="flex items-center md:flex-col "
          onClick={() => {
            onChooseStyle({ key: title, replacement });
          }}
        >
          <div className="w-full">
            <img
              src={`${publicRuntimeConfig.CLOUD_FRONT_URL}/${replacement.value}?w=180`}
              alt="replacement"
              loading="lazy"
              className={clsx(
                'w-full max-w-[440px] rounded-t-[10px] object-cover sm:max-h-[95px] md:max-w-[100%]',
                isChosen(replacement) && 'border-x border-t border-purple'
              )}
            />
            <div
              className={clsx(
                'w-full max-w-[440px] rounded-b-[10px]  border-x border-b py-1.5 text-center text-sm font-medium md:max-w-none',
                isChosen(replacement)
                  ? 'border-purple bg-purple-300 text-purple'
                  : 'border-gray-200 text-gray-600'
              )}
            >
              {replacement.title}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

const StyleSelectSection = (props: StyleSelectSectionProps) => {
  const { t } = useTranslation();

  const tabs = props.systemFileLayers?.map((layer) => ({
    label: layer.title,
    content: (
      <StylesSelect
        title={layer.title}
        replacements={layer.replacements}
        {...props}
      />
    ),
  }));

  return (
    <div className="mt-4 w-full" id="styles-select">
      <div className="font-medium text-gray-900">{t('select-style')}</div>
      <SearchForm classes="w-full mt-4" placeholder={t('search-style')} />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default StyleSelectSection;
