import { PATH, TAKE } from '@constants';
import type { BlogsPageContentProps } from '@containers/pages/Blogs';
import BlogsPageContent from '@containers/pages/Blogs';
import type { BlogDetailProps } from '@containers/pages/Blogs/BlogDetail';
import BlogDetailPage from '@containers/pages/Blogs/BlogDetail';
import CI from '@utils/connectionInstance';
import { getIdFromUrl } from '@utils/common';
import type { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import React from 'react';
import slugify from 'slugify';

const { publicRuntimeConfig } = getConfig();

type BlogsPageProps = BlogsPageContentProps | BlogDetailProps;

const BlogsPage = (props: BlogsPageProps) => {
  if ('blogs' in props) {
    return <BlogsPageContent {...props} />;
  }

  return <BlogDetailPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<BlogsPageProps> = async (
  context
) => {
  const { slug } = context.query;

  if (slug?.includes('page-')) {
    const pageNumber = getIdFromUrl(slug);

    const { posts, total } = await CI.get<any, BlogResponse>('/posts', {
      params: { offset: +pageNumber - 1, take: TAKE.BLOG },
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
  }

  const blogId = getIdFromUrl(slug);
  const blog = await CI.get<any, Blog>(`/posts/${blogId}`);

  return {
    props: { blog },
  };
};

export default BlogsPage;
