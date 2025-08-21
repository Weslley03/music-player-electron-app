import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { Album } from '../../types/album-type';
import type { Music } from '../../types/music-type';
import styles from './ViewCardSelected.module.scss';
import colors, { getDominantColorFromImage } from '../../utils/colors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setPlayList, updateCurrentMusic } from '../../reducers/currentMusicReducer';
import type { Artist } from '../../types/artist-type';
import { getArtistById } from '../../services/artist/artist-service';
import { getMusicByAlbumId, getMusicByArtistId } from '../../services/music/music-service';
import { getAlbumById } from '../../services/album/album-service';

type AlbumWithType = Album & { type: "album" };
type ArtistWithType = Artist & { type: "artist" };

type CardItem = AlbumWithType | ArtistWithType;

const ViewCardSelected = () => {
  const dispatch = useAppDispatch();
  const { currentMusic } = useAppSelector((state) => state.music);

  const { type, id } = useParams<{ type: string, id: string }>();
  const [optionSelected, setOptionSelected] = useState<CardItem | null>(null);
  const [musics, setMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<string>('#000');

  const selectMusic = (music: Music) => {
    dispatch(updateCurrentMusic(music));
  };

  useEffect(() => {
    switch (type) {
      case 'album': {
        const getAlbums = async () => {
          setLoading(true)
          const response = await getMusicByAlbumId(id!);
          const album = await getAlbumById(id!);

          if (response) {
            setOptionSelected({ ...album, type: 'album' });
            setMusics(response);
            dispatch(setPlayList(response));
            setLoading(false)
          };
        };

        getAlbums();
        return
      };

      case 'artist': {
        const getArtists = async () => {
          setLoading(true)
          const response = await getMusicByArtistId(id!);
          const artist = await getArtistById(id!);

          if (response) {
            setOptionSelected({ ...artist, type: 'artist' });
            setMusics(response);
            dispatch(setPlayList(response));
            setLoading(false)
          };
        };

        getArtists();
        return
      };

    }
  }, [dispatch, type, id]);

  useEffect(() => {
    if (optionSelected) {
      const imgEl = imgRef.current;
      if (imgEl && imgEl.complete) {
        setBgColor(getDominantColorFromImage(imgEl));
      } else if (imgEl) {
        imgEl.onload = () => {
          setBgColor(getDominantColorFromImage(imgEl));
        };
      }
    }
  }, [optionSelected]);

  const optionSection = (item: CardItem) => {
    return (
      <div>
        <div className={styles.albumInfo} style={{ backgroundColor: bgColor }}>
          <div className={styles.headerContent}>
            <img
              ref={imgRef}
              src={`data:image/jpeg;base64,${item.img}`}
              className={styles.albumCapa}
              crossOrigin="anonymous"
            />
            <div className={styles.text}>
              <h2> {item.type === 'album' ? item.title : item.name} </h2>
              <p> {item.type === 'album' ? item.author : ''} </p>
            </div>
          </div>
        </div>

        <div className={styles.availableMusics}>
          {
            musics && musics.map((music, index) => (
              <div
                key={music.id}
                className={styles.musicInline}
                onClick={() => selectMusic(music)}
                style={{ backgroundColor: currentMusic?.id === music.id ? colors.dark500 : '' }}
              >
                <span> {index + 1} </span>
                <div className={styles.author}>
                  <span className={styles.title}> {music.title} </span>
                  <span className={styles.description}> {music.author} </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <p className="loading"> buscando... </p>
      ) : optionSelected ? (
        optionSection(optionSelected)
      ) : (
        <p className="not-found"> não encontrado. </p>
      )}
    </div>
  );
};

export default ViewCardSelected;
