import clsx from 'clsx';
import Link from 'next/link';

import type { SidebarMenuItem } from '..';

const SidebarItem = ({
  icon,
  title,
  isActive,
  subSidebarItems,
  path,
}: SidebarMenuItem) => {
  return (
    <>
      <Link href={path} className="w-full">
        <div
          className={clsx(
            'mb-1 flex h-[44px] cursor-pointer flex-col justify-center rounded-lg px-3 py-1 hover:bg-purple-300',
            isActive && 'bg-purple-300'
          )}
        >
          <div className="flex select-none items-center">
            <div className="ml-0.5 mr-3.5 flex w-6 justify-center">{icon}</div>
            <div
              className={clsx(
                'text-sm font-medium',
                isActive ? 'text-purple' : 'text-gray-400'
              )}
            >
              {title}
            </div>
          </div>
        </div>
      </Link>

      <div className="ml-[25px] flex flex-col border-l-2 pl-[26px]">
        {subSidebarItems?.map((item) => (
          <Link
            href={item.path}
            className={clsx(
              'block h-fit cursor-pointer py-3  text-sm font-medium hover:text-purple',
              item.isActive ? 'text-purple' : 'text-gray-400'
            )}
            key={item.id}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SidebarItem;
