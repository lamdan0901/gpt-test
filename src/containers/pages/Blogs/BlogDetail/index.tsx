import HorizontalAdBanner from '@component/AdBanner/HorizontalAdBanner';
import NavigationBar from '@component/NavigationBar';
import Tag from '@component/Tag';
import { PATH } from '@constants';
import { Main } from '@containers/layout/Main';
import { Meta } from '@containers/layout/Meta';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import { t } from 'i18next';
import React from 'react';

export interface BlogDetailProps {
  blogId?: string;
  blog: Blog;
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Ghepanhdep - Blog detail"
          description="Blog detail description"
        />
      }
    >
      <NavigationBar
        previousPath={`${PATH.BLOGS}?page=1`}
        previousPathName={t('blog')}
        currentPathName={blog.title}
      />

      <h4 className="pt-8 text-xl font-semibold">{blog.title}</h4>
      <span className="mt-2 text-sm text-gray-500">
        {t('post-meta', {
          author: 'TQN',
          date: format(new Date(blog.createdAt), 'dd/MM/yyyy'),
        })}
      </span>

      <div className="my-4">{parse(blog.content)}</div>

      <HorizontalAdBanner imgUrl="/assets/images/horizontal-ad-banner.png" />

      <div className="my-8 flex gap-1.5">
        {blog.tags.map((tag) => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </div>
    </Main>
  );
};

export default BlogDetail;
