import React from 'react';
import styles from './RoundBottom.module.scss';
import colors from '../../utils/colors';

type Props = {
  children: React.ReactNode;
  backgroundColor?: string
}

const RoundBottom: React.FC<Props> = ({
  children,
  backgroundColor = colors.dark200,
}) => {
  return (
    <div
      className={styles.roundBottom}
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

export default RoundBottom;