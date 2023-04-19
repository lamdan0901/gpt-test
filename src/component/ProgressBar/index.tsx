import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div className="absolute top-[50%] left-[50%] w-10/12 translate-x-[-50%] translate-y-[-50%]">
      <div className="relative  h-10 w-full rounded-[10px] bg-white ">
        <div
          className="absolute top-0 left-0 h-10 rounded-l-[10px] bg-purple transition-all"
          style={{
            width: `${value}%`,
            borderTopRightRadius: value === 100 ? '10px' : '0px',
            borderBottomRightRadius: value === 100 ? '10px' : '0px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
