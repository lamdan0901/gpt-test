import AdBanner from '@component/AdBanner/SideAdBanner';
import { PATH } from '@constants';
import { DataContext } from '@pages/_app';
import BookIcon from '@public/assets/icons/book';
import CloseIcon from '@public/assets/icons/close';
import CrownIcon from '@public/assets/icons/crown';
import ElementsIcon from '@public/assets/icons/elements';
import LightningIcon from '@public/assets/icons/lightning';
import LogoIcon from '@public/assets/icons/logo';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import slugify from 'slugify';

import SidebarItem from './SidebarItem';

export interface SidebarSubMenuItem {
  id: number;
  path: string;
  title: string;
  isActive: boolean;
}

export interface SidebarMenuItem {
  icon: JSX.Element;
  title: string;
  path: string;
  isActive: boolean;
  subSidebarItems?: SidebarSubMenuItem[];
}

interface SidebarProps {
  onClose?(): void;
  isOpen?: boolean;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const { asPath: currentPath } = useRouter();
  const { categories } = useContext(DataContext);

  const getIcon = (icon: JSX.Element, color?: string): JSX.Element =>
    React.cloneElement(icon, { color });

  const isRouteActive = (targetPath: string) =>
    currentPath.includes(targetPath);

  const getColor = (targetPath: string) =>
    isRouteActive(targetPath) ? '#5A4CDB' : undefined;

  const menuItems: SidebarMenuItem[] = [
    {
      icon: getIcon(<LightningIcon />, getColor(PATH.TRENDING)),
      title: t('trending'),
      path: `${PATH.TRENDING}`,
      isActive: isRouteActive(PATH.TRENDING),
    },
    {
      icon: getIcon(<CrownIcon />, getColor(PATH.NEW)),
      title: t('new'),
      path: `${PATH.NEW}`,
      isActive: isRouteActive(PATH.NEW),
    },
    {
      icon: getIcon(<BookIcon />, getColor(PATH.BLOGS)),
      title: t('blogs'),
      path: `${PATH.BLOGS}`,
      isActive: isRouteActive(PATH.BLOGS),
    },
    {
      icon: getIcon(<ElementsIcon />, getColor(PATH.CATEGORIES)),
      title: t('categories'),
      path: `${PATH.CATEGORIES}${slugify(categories[0]?.title ?? '', {
        lower: true,
      })}-${categories[0]?.id}/`,
      isActive: isRouteActive(PATH.CATEGORIES),
      subSidebarItems: categories.map(({ id, title }) => {
        const path = `${PATH.CATEGORIES}${slugify(title, {
          lower: true,
        })}-${id}/`;
        return {
          id,
          title,
          isActive: isRouteActive(path),
          path,
        };
      }),
    },
  ];

  return (
    <div
      className={clsx(
        'relative min-w-[210px] max-w-[100%] border-r bg-white p-4 sm:p-8 md:block md:max-w-[230px] md:px-[12px] md:py-8',
        !isOpen && 'hidden'
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="mb-4 flex items-center justify-start">
          <div className="relative h-[32px] w-[42px]">
            <LogoIcon />
          </div>
          <div className="ml-2 text-sm font-medium text-purple">
            {t('logo-title')}
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-transparent p-2 hover:bg-gray-100 md:hidden"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-start justify-center">
        {menuItems.map((item) => (
          <SidebarItem {...item} key={item.path} />
        ))}
      </div>

      <div className="mt-8 w-full">
        <AdBanner imgUrl="/assets/images/sample-ad-banner.png" />
      </div>
    </div>
  );
};

export default Sidebar;
