import { PATH, TAKE } from '@constants';
import type { BlogsPageContentProps } from '@containers/pages/Blogs';
import BlogsPageContent from '@containers/pages/Blogs';
import CI from '@utils/connectionInstance';
import type { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import React from 'react';
import slugify from 'slugify';

const { publicRuntimeConfig } = getConfig();

const BlogsPageIndex = (props: BlogsPageContentProps) => {
  return <BlogsPageContent {...props} />;
};

export const getServerSideProps: GetServerSideProps<
  BlogsPageContentProps
> = async () => {
  const { posts, total } = await CI.get<any, BlogResponse>('/posts', {
    params: { offset: 0, take: TAKE.BLOG },
  });

  const blogs = posts?.map((blog) => ({
    ...blog,
    path: `${PATH.BLOGS}${slugify(blog.title, { lower: true })}-${blog.id}`,
    imageKey: `${publicRuntimeConfig.CLOUD_FRONT_URL}/${blog.imageKey}?w=400`,
  }));

  return {
    props: {
      take: TAKE.BLOG,
      blogs,
      total,
    },
  };
};

export default BlogsPageIndex;
