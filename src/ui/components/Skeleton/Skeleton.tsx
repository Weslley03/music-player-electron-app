import React from "react";
import styles from './Skeleton.module.scss';

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "100%",
  borderRadius = "8px",
  className = "",
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
