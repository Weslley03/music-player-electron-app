import React from 'react';
import type { IconProps } from '../types/IconProps';

const BeforeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', margin: 'auto' }}
    >
      <g transform="scale(-1,1) translate(-16,0)">
        <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
      </g>
    </svg>
  );
};

export default BeforeIcon;
