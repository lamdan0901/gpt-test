import { PATH, TAKE } from '@constants';
import CategoryPageContent from '@containers/pages/Category';
import CI from '@utils/connectionInstance';
import { getIdFromUrl } from '@utils/common';
import type { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import React from 'react';
import slugify from 'slugify';

const { publicRuntimeConfig } = getConfig();

interface CategoryProps extends TemplateResponse {
  path: string;
  category: Category;
}

const CategoryPageIndex = (props: CategoryProps) => {
  return <CategoryPageContent {...props} />;
};

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context
) => {
  const { categoryId } = context.query;
  const id = getIdFromUrl(categoryId);

  const [{ templates, total }, category] = await Promise.all([
    CI.get<any, TemplateResponse>('/templates', {
      params: { offset: 0, take: TAKE.TEMPLATE, categoryId: id },
    }),
    CI.get<any, Category>(`${PATH.CATEGORIES}${id}`),
  ]);

  return {
    props: {
      page: 1,
      total,
      category,
      path: `${slugify(category.title, { lower: true })}-${id}/`,
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

export default CategoryPageIndex;
