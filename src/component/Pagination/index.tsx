import LeftChevronIcon from '@public/assets/icons/left-chevron';
import RightChevronIcon from '@public/assets/icons/right-chevron';
import React, { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}: PaginationProps) => {
  const pageNumbers = useMemo(
    () => [...Array(totalPages)].map((_, number) => number + 1),
    [totalPages]
  );

  const isStartPage = currentPage === 1;
  const isEndPage = currentPage === totalPages;

  if (!totalPages) return <></>;

  return (
    <div
      className={`absolute bottom-10 flex w-min items-center gap-2 ${props?.className}`}
    >
      <button
        type="button"
        aria-label="prev-page"
        onClick={() => onPageChange(currentPage - 1)}
        className={`${isStartPage ? 'pointer-events-none' : ''} px-4 py-2`}
      >
        <LeftChevronIcon color={isStartPage ? '#D2D4DA' : undefined} />
      </button>

      <nav className="inline-flex">
        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? 'bg-purple text-white'
                : ' text-gray-900 hover:text-purple'
            } h-[34px] rounded-[4px] px-3.5 text-base duration-200`}
          >
            {pageNumber}
          </button>
        ))}
      </nav>

      <button
        type="button"
        aria-label="next-page"
        onClick={() => onPageChange(currentPage + 1)}
        className={`${isEndPage ? 'pointer-events-none' : ''} px-4 py-2`}
      >
        <RightChevronIcon color={isEndPage ? '#D2D4DA' : undefined} />
      </button>
    </div>
  );
};

export default Pagination;
