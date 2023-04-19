import Pagination from '@component/Pagination';
import { PATH } from '@constants';
import ImageCard from '@containers/ImageCard';
import { Main } from '@containers/layout/Main';
import { Meta } from '@containers/layout/Meta';
import { getIdFromUrl } from '@utils/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface BlogsPageContentProps {
  blogs: Blog[];
  total: number;
  take: number;
  page?: number | string;
}

const BlogsPageContent = ({ blogs, total, take }: BlogsPageContentProps) => {
  const router = useRouter();
  const page = getIdFromUrl(router.query.slug);
  const [currentPage, setCurrentPage] = useState(+page);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage) return;

    setCurrentPage(pageNumber);
    router.push({
      pathname:
        pageNumber === 1 ? PATH.BLOGS : `${PATH.BLOGS}page-${pageNumber}`,
    });
  };

  return (
    <Main meta={<Meta title="Ghepanhdep - Blogs" description="" />}>
      <div className="flex min-h-[calc(100vh_-_300px)] flex-col items-center">
        <div className="mb-24 grid w-full grid-cols-1 gap-y-[44px] gap-x-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {blogs?.map((blog) => (
            <Link key={blog.id} href={blog.path}>
              <ImageCard
                imgSrc={blog.imageKey}
                title={blog.title}
                description={blog.shortContent}
                className="rounded-xl border-[1px] border-gray-200"
              />
            </Link>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(total / take)}
          onPageChange={handlePageChange}
        />
      </div>
    </Main>
  );
};

export default BlogsPageContent;
