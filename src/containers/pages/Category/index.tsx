import { PATH, TAKE } from '@constants';
import { Main } from '@containers/layout/Main';
import { Meta } from '@containers/layout/Meta';
import Templates from '@containers/pages/Templates';
import React from 'react';

interface CategoryProps extends TemplateResponse {
  path: string;
  category: Category;
}

const CategoryPageContent = ({
  path,
  templates,
  category,
  total,
  page,
}: CategoryProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Ghepanhdep - Template category"
          description="Template category description"
        />
      }
    >
      <h1 className="border-l-[3px] border-purple pl-2 text-xl font-medium leading-6 text-black">
        {category?.title}
      </h1>
      <div className="mt-3 mb-[32px] max-w-[565px] text-sm text-gray-500">
        {category?.description}
      </div>

      <Templates
        templates={templates}
        total={total}
        page={page}
        take={TAKE.TEMPLATE}
        path={`${PATH.CATEGORIES}${path}`}
      />
    </Main>
  );
};

export default CategoryPageContent;
