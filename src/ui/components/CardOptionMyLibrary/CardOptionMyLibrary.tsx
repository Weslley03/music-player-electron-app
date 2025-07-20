import type React from 'react';
import styles from './CardOptionMyLibrary.module.scss';
import type { CardType } from '../../types/MyLibrary/CardType';
import { useState } from 'react';
import colors from '../../utils/colors';

type Props = {
  imgSrc: string;
  title: string;
  description?: string;
  type: CardType;
  hoverColor?: string;
  reducedUI: boolean;
}

const CardOptionMyLibrary: React.FC<Props> = ({
  imgSrc,
  title,
  description,
  type,
  hoverColor = colors.dark400,
  reducedUI,
}) => {
  const cardTypeMap: Record<CardType, string> = {
    artist: 'Artista',
    album: 'Álbum',
    playlist: 'Playlist',
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? hoverColor : undefined,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div>
        <img
          src={imgSrc}
          className={styles.img}
          style={
            reducedUI && isHovered
              ? { transform: "scale(1.1)" }
              : { transform: "scale(1)" }
          }
        />
      </div>
      {!reducedUI && (
        <div className={styles.content}>
          <div className={styles.title}>
            <p> {title} </p>
          </div>
          <div className={styles.description}>
            <p> {type === 'artist' ? 'Artista' : `${cardTypeMap[type]} - ${description}`} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardOptionMyLibrary;