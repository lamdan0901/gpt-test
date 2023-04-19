import React from 'react';

interface TagProps {
  tag: Tag;
}
const Tag = ({ tag }: TagProps) => {
  return (
    <div className="m-0 rounded-xl bg-gray-200 py-1 px-3 text-[12px] text-gray-900">
      {tag.name}
    </div>
  );
};

export default Tag;
