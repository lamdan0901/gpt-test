import clsx from 'clsx';
import React from 'react';

interface ImageCardProps {
  imgSrc: string;
  title: string;
  description?: string;
  className?: HTMLElement['className'];
  textCenter?: boolean;
}

const ImageCard = ({
  className = '',
  imgSrc,
  title,
  description,
  textCenter,
}: ImageCardProps) => {
  return (
    <div className={`${className} relative`}>
      <img
        src={imgSrc}
        alt="template"
        loading="lazy"
        className={clsx(
          'mx-auto aspect-video object-cover',
          textCenter ? 'rounded-t-xl' : 'rounded-xl'
        )}
      />
      <div
        className={
          textCenter
            ? 'line-clamp-3 absolute left-[50%]  w-full translate-x-[-50%] translate-y-2 text-center text-gray-600'
            : 'text-md line-clamp-3 m-4 font-medium text-gray-900'
        }
      >
        {title}
      </div>
      <div
        className={clsx(
          'line-clamp-3 mx-4 mb-4 text-sm text-gray-600',
          textCenter && 'absolute bottom-[-40px] left-[50%] translate-x-[-50%]'
        )}
      >
        {description}
      </div>
    </div>
  );
};

export default ImageCard;
