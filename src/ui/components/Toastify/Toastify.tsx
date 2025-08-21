import type React from 'react';
import styles from './Toastify.module.scss';
import { useEffect } from 'react';

export type ToastifyTypes = "success" | "error" | "warning" | "info";

type ToastifyProps = {
  message: string;
  type?: ToastifyTypes;
  duration?: number;
  onClose?: () => void;
};

const Toastify: React.FC<ToastifyProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.container} ${styles[type ?? "info"]}`}>
      <span className={styles.message}> {message} </span>
    </div>
  );
};

export default Toastify;