import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="z-1 flex flex-wrap items-center justify-start gap-3  border-t bg-white py-3 px-4 text-center text-sm sm:px-8 md:justify-between">
      <Link href="/" className="text-purple">
        {t('copyright', { year: new Date().getFullYear() })}
      </Link>
      <div className="flex w-fit flex-wrap justify-start  text-gray-700 md:items-center  md:justify-between">
        <Link
          className="border-r-[1px] border-gray-200 pr-3 hover:text-purple"
          href="/about-us"
        >
          {t('about-us')}
        </Link>
        <Link
          className="border-r-[1px] border-gray-200 px-3 hover:text-purple"
          href="/terms-and-conditions"
        >
          {t('terms-and-condition')}
        </Link>
        <Link className="hover:text-purple xs:pl-3" href="/privacy-policy">
          {t('privacy-policy')}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
