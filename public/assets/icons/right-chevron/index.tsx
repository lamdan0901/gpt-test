import React from 'react';

const RightChevron = ({ color = '#101223' }) => {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.78125 0.800781L7.78125 6.80078L1.78125 12.8008L0.375 11.3945L4.96875 6.80078L0.375 2.20703L1.78125 0.800781Z"
        fill={color}
      />
    </svg>
  );
};

export default RightChevron;
