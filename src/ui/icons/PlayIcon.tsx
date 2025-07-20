import React from 'react';
import type { IconProps } from '../types/IconProps';

const PlayIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => {
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
      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
    </svg>
  );
};

export default PlayIcon;
