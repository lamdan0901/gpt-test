import { PATH, TAKE } from '@constants';
import NewPageContent from '@containers/pages/New';
import CI from '@utils/connectionInstance';
import { getIdFromUrl } from '@utils/common';
import type { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import slugify from 'slugify';

const { publicRuntimeConfig } = getConfig();

const NewPage = (props: TemplateResponse) => {
  return <NewPageContent {...props} />;
};

export const getServerSideProps: GetServerSideProps<TemplateResponse> = async (
  context
) => {
  const pageNum = getIdFromUrl(context.query.pageNum);

  const { templates, total } = await CI.get<any, TemplateResponse>(
    '/templates',
    {
      params: { offset: +pageNum - 1, take: TAKE.TEMPLATE, order: 'id desc' },
    }
  );

  return {
    props: {
      total,
      page: pageNum,
      templates: templates?.map((template) => ({
        ...template,
        path: `${PATH.TEMPLATES}${slugify(template.title, { lower: true })}-${
          template.id
        }`,
        previewImageKey: `${publicRuntimeConfig.CLOUD_FRONT_URL}/${template.previewImageKey}?w=300`,
      })),
    },
  };
};

export default NewPage;
