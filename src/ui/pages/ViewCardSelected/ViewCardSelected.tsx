import { useParams } from 'react-router-dom';
import GenericLayout from '../../layouts/GenericLayout';
import { useEffect, useRef, useState } from 'react';
import type { Album, AlbumsResponse } from '../../types/MyLibrary/album';
import api from '../../services/api';
import type { Music } from '../../types/music';
import styles from './ViewCardSelected.module.scss';
import colors, { getDominantColorFromImage } from '../../utils/colors';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { updateCurrentMusic } from '../../reducers/currentMusicReducer';

const ViewCardSelected = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [musics, setMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState<string>('#000');

  const [musicSelected, setMusicSelected] = useState<number[]>([]);

  const updateMusicSelected = (newValue: number) => {
    if (musicSelected.length >= 1) {
      setMusicSelected([]);
    }
    setMusicSelected([newValue]);
  }

  const selectMusic = (music: Music) => {
    updateMusicSelected(music.id);
    console.log('musicSelected: ', musicSelected[0])
    dispatch(updateCurrentMusic(music));
  };

  useEffect(() => {
    const getAlbums = async () => {
      setLoading(true)
      try {
        const response = await api.get<AlbumsResponse>('/albums.json');
        const extractedAlbum = response.data.albums.find(a => {
          return a.id === Number(id)
        });
        if (extractedAlbum) {
          setAlbum(extractedAlbum);
          setMusics(extractedAlbum?.musics);
          setLoading(false)
        }
      } catch (err) {
        console.error('erro ao carregar álbuns:', err);
      }
    };

    getAlbums();
  }, [id]);

  useEffect(() => {
    if (album) {
      const imgEl = imgRef.current;
      if (imgEl && imgEl.complete) {
        setBgColor(getDominantColorFromImage(imgEl));
      } else if (imgEl) {
        imgEl.onload = () => {
          setBgColor(getDominantColorFromImage(imgEl));
        };
      }
    }

  }, [album]);

  const albumSection = (album: Album) => {
    return (
      <div>
        <div className={styles.albumInfo} style={{ backgroundColor: bgColor }}>
          <div className={styles.headerContent}>
            <img
              ref={imgRef}
              src={album.img}
              className={styles.albumCapa}
              crossOrigin="anonymous"
            />
            <div className={styles.text}>
              <h2>{album.title}</h2>
              <p>{album.description}</p>
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
                style={{ backgroundColor: musicSelected[0] === music.id ? colors.dark500 : '' }}
              >
                <span> {index + 1} </span>
                <div className={styles.author}>
                  <span className={styles.title}> {music.title} </span>
                  <span className={styles.description}> {music.description} </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  return (
    <GenericLayout>
      <div className={styles.mainContainer}>
        {loading ? (
          <p className="loading"> buscando... </p>
        ) : album ? (
          albumSection(album)
        ) : (
          <p className="not-found"> Álbum não encontrado. </p>
        )}
      </div>
    </GenericLayout>
  );
};

export default ViewCardSelected;
