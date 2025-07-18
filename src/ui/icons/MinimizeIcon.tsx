import React from 'react';
import type { IconProps } from '../types/IconProps';

const MinimizeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.53 1.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 1 1 0 1.5H9.25V3.171a.75.75 0 1 1 1.5 0V4.19l2.72-2.72a.75.75 0 0 1 1.06 0M1.47 14.53a.75.75 0 0 1 0-1.06l2.72-2.72H3.171a.75.75 0 0 1 0-1.5H6.75v3.579a.75.75 0 1 1-1.5 0V11.81l-2.72 2.72a.75.75 0 0 1-1.06 0"
        fill={color}
      />
    </svg>
  );
};

export default MinimizeIcon;