import React from 'react';
import styles from './RoundBottom.module.scss';
import colors from '../../utils/colors';

type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
  onClick?: () => void;
}

const RoundBottom: React.FC<Props> = ({
  children,
  backgroundColor = colors.dark200,
  onClick,
}) => {
  return (
    <div
      className={styles.roundBottom}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default RoundBottom;