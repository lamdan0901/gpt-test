import React from 'react';

const LeftChevron = ({ color = '#101223' }) => {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.62109 2.20703L3.02734 6.80078L7.62109 11.3945L6.21484 12.8008L0.214844 6.80078L6.21484 0.800781L7.62109 2.20703Z"
        fill={color}
      />
    </svg>
  );
};

export default LeftChevron;
