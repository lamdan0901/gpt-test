import HorizontalAdBanner from '@component/AdBanner/HorizontalAdBanner';
import NavigationBar from '@component/NavigationBar';
import Tag from '@component/Tag';
import { PATH } from '@constants';
import UploadPhotoForm from '@containers/Form/UploadPhotoForm';
import { Main } from '@containers/layout/Main';
import { Meta } from '@containers/layout/Meta';
import CTASection from '@containers/pages/Template/CTA';
import SuggestionSection from '@containers/pages/Template/Suggestion';
import { getBinaryFormat, getIdFromUrl } from '@utils/common';
import CI from '@utils/connectionInstance';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TemplatePageProps {
  template: Template;
  templateId?: number;
}

enum LayerType {
  SYSTEM_FILE = 'SYSTEM_FILE',
  USER_UPLOAD = 'USER_UPLOAD',
}

enum ReplacementType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

enum ImageStyle {
  PNG_STYLE = 'PNG_STYLE',
  JPG_STYLE = 'JPG_STYLE',
}

const TemplatePage = ({ template }: TemplatePageProps) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [imageResult, setImageResult] = useState('');
  const [isMakingPicture, setIsMakingPicture] = useState(false);

  const userUploadLayers = template.layers.layer.filter(
    ({ layerType }) => layerType === LayerType.USER_UPLOAD
  );

  const systemFileLayers = template.layers.layer.filter(
    ({ layerType, fileType }) =>
      layerType === LayerType.SYSTEM_FILE &&
      Object.keys(ImageStyle).includes(fileType)
  );

  const imageInputs: Replacement[] = [];
  const textInputs: Replacement[] = [];

  userUploadLayers?.forEach((layer) => {
    layer.replacements.forEach((replacement) => {
      if (replacement.type === ReplacementType.IMAGE) {
        replacement.order = layer.order;
        imageInputs.push(replacement);
      }
    });
  });

  userUploadLayers?.forEach((layer) => {
    layer.replacements.forEach((replacement) => {
      if (replacement.type === ReplacementType.TEXT) {
        replacement.order = layer.order;
        textInputs.push(replacement);
      }
    });
  });

  const handleSubmitForm = async (value: any) => {
    // remember to validate input fields first
    setIsMakingPicture(true);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p === 95) {
          clearInterval(interval);
          return p;
        }
        return p + 5;
      });
    }, 500);

    await Promise.all(
      Object.keys(value).map(async (key) => {
        if (value[key] instanceof File) {
          const { data } = await axios.post<
            any,
            { data: { key: string; url: string } }
          >('/api/generatePresignUrl', {
            imgExt: value[key].name.split('.').pop(),
          });

          const { key: imgKey, url } = data;
          const binaryImg = await getBinaryFormat(value[key]);
          console.log(' key, url: ', imgKey);

          await axios.put('/api/generatePresignUrl', {
            url,
            binaryImg,
          });
          value[key] = imgKey;
        }
      })
    );

    value = {
      id: template.id,
      inputs: [
        {
          name: 'size',
          order: 0,
          value: value.size,
        },
        ...[...textInputs, ...imageInputs].map((input) => ({
          name: `input ${input.title}`,
          order: input.order,
          value: Object.keys(value).find((key) => key === input.title),
        })),
      ],
    };
    console.log('value: ', value);

    const { data } = await axios.post<any, { data: string }>(
      '/api/generateTemplate',
      value
    );
    console.log('res: ', data);
    setImageResult(data);
  };

  const handleContinueEdit = () => {
    setIsMakingPicture(false);
    setImageResult('');
    setProgress(0);
  };

  return (
    <Main
      meta={
        <Meta
          title="Ghepanhdep - Template"
          description="Template description"
        />
      }
    >
      <div className="flex flex-col items-start">
        <NavigationBar
          previousPath={PATH.TRENDING}
          previousPathName={t('trending')}
          currentPathName={template.title}
        />

        <CTASection
          progress={progress}
          imageResult={imageResult}
          hasTemplateStyles={!!systemFileLayers.length}
          isMakingPicture={isMakingPicture}
          onContinueEdit={handleContinueEdit}
          template={template}
        />

        {!isMakingPicture && (
          <UploadPhotoForm
            sizes={template.params.sizes}
            textInputs={textInputs}
            imageInputs={imageInputs}
            systemFileLayers={systemFileLayers}
            onSubmit={handleSubmitForm}
          />
        )}

        <HorizontalAdBanner imgUrl="/assets/images/horizontal-ad-banner.png" />

        {!isMakingPicture && (
          <div className="my-4 flex flex-wrap gap-1.5">
            {template.tags.map((tag) => (
              <Tag tag={tag} key={tag.id} />
            ))}
          </div>
        )}

        <SuggestionSection />
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<TemplatePageProps> = async (
  context
) => {
  const templateId = getIdFromUrl(context.query.templateId);

  const template = await CI.get<any, Template>(
    `${PATH.TEMPLATES}${templateId}`
  );

  return {
    props: {
      template,
    },
  };
};

export default TemplatePage;
