import type React from "react";
import styles from './Row.module.scss';
import type { Album } from "../../types/album-type";
import type { Artist } from "../../types/artist-type";
import Skeleton from "../Skeleton/Skeleton";

type CardItem = Album | Artist;

type RowProps = {
  title: string
  cards: CardItem[]
};

const Row: React.FC<RowProps> = ({
  title,
  cards,
}) => {

  return (
    <div className={styles.content}>
      <span className={styles.title}> {title} </span>
      <div className={styles.options}>
        {cards && cards.length > 0 ? cards.map((item) => (
          <div className={styles.option}>
            <img className={styles.artistCapa} src={`data:image/jpeg;base64,${item.img}`} />
          </div>
        ))
          : (
            <Skeleton width="180px" height="150px" borderRadius="8px" />
          )
        }
      </div>
    </div>
  );
};

export default Row;