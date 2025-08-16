import type React from 'react';
import styles from './DefaultButton.module.scss';

interface DefaultButtonProps {
  text: string;
  onClick: () => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <button> {text} </button>
    </div>
  )
}

export default DefaultButton;