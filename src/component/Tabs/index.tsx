import clsx from 'clsx';
import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs?: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex border-b border-gray-200">
        {tabs?.map((tab, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveTab(index)}
            className={clsx(
              'relative top-[1px] px-4 pb-2 font-medium focus:outline-none',
              activeTab === index
                ? 'border-b-2 border-purple text-purple'
                : ' text-gray-400'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs?.[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
