import React from 'react';

const DownChevron = ({ color = '#323232' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_456_13840)">
        <path
          d="M2.98922 7.38048C2.49922 7.87048 2.49922 8.66048 2.98922 9.15048L11.2992 17.4605C11.6892 17.8505 12.3192 17.8505 12.7092 17.4605L21.0192 9.15048C21.5092 8.66048 21.5092 7.87048 21.0192 7.38048C20.5292 6.89048 19.7392 6.89048 19.2492 7.38048L11.9992 14.6205L4.74922 7.37048C4.26922 6.89048 3.46922 6.89048 2.98922 7.38048Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_456_13840">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="matrix(0 1 -1 0 24 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownChevron;
