import React from 'react';

export interface AdBannerProp {
  imgUrl: string;
  className?: string;
}
const AdBanner = ({ imgUrl, className = '' }: AdBannerProp) => {
  return (
    <div className={className}>
      <img
        src={imgUrl}
        className="mx-auto w-full max-w-[250px]"
        alt="ad-banner"
      />
    </div>
  );
};

export default AdBanner;
