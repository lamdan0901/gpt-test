import ForwardChevronIcon from '@public/assets/icons/forward-chevron';
import LightningIcon from '@public/assets/icons/lightning';
import Link from 'next/link';
import React from 'react';

interface NavigationBarProps {
  previousPath: string;
  previousPathName: string;
  currentPathName: string;
}
const NavigationBar = ({
  previousPath,
  previousPathName,
  currentPathName,
}: NavigationBarProps) => {
  return (
    <div className="flex items-center gap-3">
      <LightningIcon color="#5A4CDB" />
      <Link
        href={previousPath}
        className="text-sm text-gray-400 hover:text-purple"
      >
        {previousPathName}
      </Link>
      <ForwardChevronIcon />
      <div className="text-sm text-gray-900">{currentPathName}</div>
    </div>
  );
};

export default NavigationBar;
