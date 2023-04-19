import { PATH, TAKE } from '@constants';
import TrendingPageContent from '@containers/pages/Trending';
import { getIdFromUrl } from '@utils/common';
import CI from '@utils/connectionInstance';
import type { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import slugify from 'slugify';

const { publicRuntimeConfig } = getConfig();

const TrendingPageIndex = (props: TemplateResponse) => {
  return <TrendingPageContent {...props} />;
};

export const getServerSideProps: GetServerSideProps<TemplateResponse> = async (
  context
) => {
  const pageNum = getIdFromUrl(context.query.pageNum);

  const { templates, total } = await CI.get<any, TemplateResponse>(
    '/templates',
    {
      params: {
        offset: 0,
        take: TAKE.TEMPLATE,
        order: 'usage_count',
      },
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

export default TrendingPageIndex;
