import AdBanner from '@component/AdBanner/SideAdBanner';
import SearchForm from '@containers/Form/SearchForm';
import Footer from '@containers/layout/Footer';
import Sidebar from '@containers/layout/Sidebar';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type MainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: MainProps) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-screen-2xl bg-white antialiased">
      {props.meta}
      <AdBanner
        className="hidden bg-gray-100 pr-3 pt-3 2xl:block"
        imgUrl="/assets/images/sample-ad-banner.png"
      />

      <div className="flex w-full flex-col justify-between overflow-hidden">
        <div className="flex">
          <Sidebar />
          <div className="relative mx-auto w-full max-w-3xl p-4 sm:p-8">
            <SearchForm
              showSidebarBtn
              classes="lg:w-[288px] w-full"
              placeholder={t('search-template')}
            />
            <main className="content">{props.children}</main>
          </div>
        </div>
        <Footer />
      </div>

      <AdBanner
        className="hidden bg-gray-100 pl-3 pt-3 sm:block"
        imgUrl="/assets/images/sample-ad-banner.png"
      />
    </div>
  );
};

export { Main };
