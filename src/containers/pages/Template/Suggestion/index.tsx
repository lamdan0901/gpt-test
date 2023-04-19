import { PATH } from '@constants';
import ImageCard from '@containers/ImageCard';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import React from 'react';

const SuggestionSection = () => {
  const router = useRouter();
  const { basePath } = useRouter();

  const suggestedTemplates = [
    {
      id: 1,
      image: `${basePath}/assets/images/sample-template.png`,
      title: 'title',
      path: `${PATH.TEMPLATES}1/`,
    },
    {
      id: 2,
      image: `${basePath}/assets/images/sample-template.png`,
      title: 'title',
      path: `${PATH.TEMPLATES}2/`,
    },
    {
      id: 3,
      image: `${basePath}/assets/images/sample-template.png`,
      title: 'title',
      path: `${PATH.TEMPLATES}3/`,
    },
    {
      id: 4,
      image: `${basePath}/assets/images/sample-template.png`,
      title: 'title',
      path: `${PATH.TEMPLATES}4/`,
    },
  ];

  return (
    <div className="my-4 w-full md:mt-4">
      <div className="font-medium text-gray-900">
        {t('maybe-you-will-like')}
      </div>
      <div className="my-4 grid w-full grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 ">
        {suggestedTemplates.map((suggestedTemp) => (
          <button
            key={suggestedTemp.id}
            type="button"
            onClick={() => {
              router.push(suggestedTemp.path, undefined, {
                scroll: true,
              });
            }}
          >
            <ImageCard
              textCenter
              className="mx-auto max-w-[440px]"
              imgSrc={suggestedTemp.image}
              title={suggestedTemp.title}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionSection;
