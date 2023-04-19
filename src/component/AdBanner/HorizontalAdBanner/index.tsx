import React from 'react';

import type { AdBannerProp } from '../SideAdBanner';

const HorizontalAdBanner = ({ imgUrl }: AdBannerProp) => {
  return <img src={imgUrl} alt="ad-banner" className="my-4 w-full" />;
};

export default HorizontalAdBanner;
