import React from 'react';
import type { IconProps } from '../types/IconProps';

const PauseIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => {
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
      <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
    </svg>
  );
};

export default PauseIcon;
