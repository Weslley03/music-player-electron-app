import type React from 'react';
import styles from './RoundInput.module.scss';
import CloseIcon from '../../icons/CloseIcon';

interface RoundInputProps {
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
};

const RoundInput: React.FC<RoundInputProps> = ({
  icon,
  placeholder,
  value,
  onChange,
}) => {

  const displayXIcon = () => {
    if (value) return <CloseIcon size={20} />
  }

  const clearValue = () => onChange('');

  return (
    <div className={styles.inputContainer}>
      {icon && (
        <span className={styles.iconWrapper}>
          {icon}
        </span>
      )}
      <input
        className={styles.input}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.XIcon} onClick={clearValue}>
        {displayXIcon()}
      </div>
    </div>
  )
}

export default RoundInput;