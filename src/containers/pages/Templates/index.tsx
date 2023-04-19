import Pagination from '@component/Pagination';
import ImageCard from '@containers/ImageCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface TemplatesProps extends TemplateResponse {
  take: number;
  path: string;
}

const Templates = ({ templates, total, take, path, page }: TemplatesProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(+page);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage) return;

    setCurrentPage(pageNumber);
    router.push({
      pathname: pageNumber === 1 ? path : `${path}page-${pageNumber}`,
    });
  };

  return (
    <div className="flex min-h-[calc(100vh_-_190px)] flex-col items-center">
      <div className="mb-32 grid w-full grid-cols-1 gap-y-[80px] gap-x-4 xs:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Link key={template.id} href={template.path}>
            <ImageCard
              textCenter
              imgSrc={template.previewImageKey}
              title={template.title}
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
  );
};

export default Templates;
