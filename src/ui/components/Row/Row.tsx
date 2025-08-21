import type React from "react";
import styles from './Row.module.scss';

type RowProps = {
  title: string
};

const Row: React.FC<RowProps> = ({
  title,
}) => {
  const mock = [
    { src: 'https://images.uncyclomedia.co/necyklopedie/cs/c/cc/Taylor-swift.jpg' },
    { src: 'https://images.uncyclomedia.co/necyklopedie/cs/c/cc/Taylor-swift.jpg' },
    { src: 'https://images.uncyclomedia.co/necyklopedie/cs/c/cc/Taylor-swift.jpg' },
    { src: 'https://images.uncyclomedia.co/necyklopedie/cs/c/cc/Taylor-swift.jpg' },
  ];

  return (
    <div className={styles.content}>
      <span className={styles.title}> {title} </span>
      <div className={styles.options}>
        {mock && mock.length > 0 && mock.map((item) => (
          <div className={styles.option}>
            <img className={styles.artistCapa} src={item.src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;