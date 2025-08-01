import React from 'react';
import type { IconProps } from '../types/IconProps';

const VolumeOffIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
  <svg
    role="img"
    aria-label="Volume off"
    aria-hidden="false"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06" />
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.64 3.64 0 0 0-1.33 4.967 3.64 3.64 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.7 4.7 0 0 1-1.5-.694v1.3L2.817 9.852a2.14 2.14 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694z" />
  </svg>
);

export default VolumeOffIcon;
