import type React from "react";
import styles from './Row.module.scss';
import type { Album } from "../../types/album-type";
import type { Artist } from "../../types/artist-type";
import Skeleton from "../Skeleton/Skeleton";
import { useNavigate } from "react-router-dom";

type AlbumWithType = Album & { type: "album" };
type ArtistWithType = Artist & { type: "artist" };

type CardItem = AlbumWithType | ArtistWithType;

type RowProps = {
  title: string
  cards: CardItem[]
};

const Row: React.FC<RowProps> = ({
  title,
  cards,
}) => {
  const navigate = useNavigate();

  const directToSelected = (type: string, id: string) => {
    navigate(`/view-card-selected/${type}/${id}`);
  };

  return (
    <div className={styles.content}>
      <span className={styles.title}> {title} </span>
      <div className={styles.options}>
        {cards && cards.length > 0 ? cards.map((item) => (
          <div className={styles.option} onClick={() => directToSelected(item.type, item.id)}>
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