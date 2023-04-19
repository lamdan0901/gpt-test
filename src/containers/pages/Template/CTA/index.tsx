import AdBanner from '@component/AdBanner/SideAdBanner';
import ProgressBar from '@component/ProgressBar';
import ConvertingIcon from '@public/assets/icons/converting';
import GoBack from '@public/assets/icons/go-back';
import GoDown from '@public/assets/icons/go-down';
import getConfig from 'next/config';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const { publicRuntimeConfig } = getConfig();

interface CTASectionProps {
  template: Template;
  isMakingPicture: boolean;
  hasTemplateStyles: boolean;
  progress: number;
  imageResult: string;
  onContinueEdit: () => void;
}

const CTASection = ({
  progress,
  imageResult,
  template,
  hasTemplateStyles,
  isMakingPicture,
  onContinueEdit,
}: CTASectionProps) => {
  const { t } = useTranslation();
  const [isProgressFinished, setIsProgressFinished] = useState(false);

  return (
    <>
      <div className="my-8 flex w-full gap-4">
        <div className="relative w-full  rounded-xl">
          <img
            src={`${publicRuntimeConfig.CLOUD_FRONT_URL}/${
              imageResult || template.previewImageKey
            }?w=600`}
            onLoad={(_e) => setIsProgressFinished(!!imageResult)}
            alt="template-title"
            className="w-full rounded-xl"
          />
          {isMakingPicture && !isProgressFinished && (
            <div className="absolute top-0 left-0 h-full w-full bg-[#00000080]"></div>
          )}
          {!isMakingPicture && hasTemplateStyles && (
            <a
              href="#styles-select"
              className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md bg-purple-300 px-4 py-2 text-purple"
            >
              <ConvertingIcon />
              <span> {t('change-style')}</span>
            </a>
          )}
          {isMakingPicture && !isProgressFinished && (
            <ProgressBar value={progress} />
          )}
        </div>

        {!isMakingPicture && (
          <div className="hidden w-[250px] lg:block">
            <AdBanner imgUrl="/assets/images/sample-ad-banner2.png" />
          </div>
        )}
      </div>

      {isMakingPicture && isProgressFinished && (
        <div className="mb-3 flex w-full gap-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-200 py-3"
            onClick={() => {
              setIsProgressFinished(false);
              onContinueEdit();
            }}
          >
            <GoBack />
            <div className="text-md font-medium text-gray-900">
              {t('continue-edit')}
            </div>
          </button>
          <a
            href={`${publicRuntimeConfig.CLOUD_FRONT_URL}/${imageResult}?o=true`}
            download={imageResult}
            target="_blank"
            className="flex w-full items-center justify-center  gap-2 rounded-md bg-purple py-3"
          >
            <GoDown />
            <div className="text-md font-medium text-white">
              {t('download')}
            </div>
          </a>
        </div>
      )}

      {!isMakingPicture && (
        <div className="mb-5">
          <div className="text-xl font-medium text-gray-900">
            {template.title}
          </div>
          <div className="mt-3 text-gray-500">{template.description}</div>
        </div>
      )}
    </>
  );
};

export default CTASection;
