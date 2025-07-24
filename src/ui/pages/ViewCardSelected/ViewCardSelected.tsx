import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { Album, AlbumsResponse } from '../../types/MyLibrary/album';
import api from '../../services/api';
import type { Music } from '../../types/music';
import styles from './ViewCardSelected.module.scss';
import colors, { getDominantColorFromImage } from '../../utils/colors';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { updateCurrentMusic } from '../../reducers/currentMusicReducer';
import type { Artist, ArtistsResponse } from '../../types/MyLibrary/artist';

const ViewCardSelected = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [optionSelected, setOptionSelected] = useState<Album | Artist | null>(null);
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
    dispatch(updateCurrentMusic(music));
  };

  useEffect(() => {
    const index = id?.substring(1);
    const indexMapping = { 1: 'album', 2: 'artist' };

    switch (index) {
      case '1': {
        const getAlbums = async () => {
          setLoading(true)
          try {
            const response = await api.get<AlbumsResponse>(`/${indexMapping[index]}s.json`);
            const extractedAlbum = response.data.albums.find(a => {
              return a.id === Number(id)
            });
            if (extractedAlbum) {
              setOptionSelected(extractedAlbum);
              setMusics(extractedAlbum?.musics);
              setLoading(false)
            }
          } catch (err) {
            console.error('erro ao carregar álbuns:', err);
          }
        };

        getAlbums();
        return
      }

      case '2': {
        const getArtists = async () => {
          setLoading(true)
          try {
            const response = await api.get<ArtistsResponse>(`/${indexMapping[index]}s.json`);
            const extractedArtist = response.data.artists.find(a => {
              return a.id === Number(id)
            });
            if (extractedArtist) {
              setOptionSelected(extractedArtist);
              setMusics(extractedArtist?.musics);
              setLoading(false)
            }
          } catch (err) {
            console.error('erro ao carregar artistas:', err);
          }
        };

        getArtists();
        return
      }
    }
  }, [id]);

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

  const optionSection = (albuma: Album | Artist) => {
    return (
      <div>
        <div className={styles.albumInfo} style={{ backgroundColor: bgColor }}>
          <div className={styles.headerContent}>
            <img
              ref={imgRef}
              src={albuma.img}
              className={styles.albumCapa}
              crossOrigin="anonymous"
            />
            <div className={styles.text}>
              <h2>{albuma.title}</h2>
              <p>{albuma.description}</p>
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
    <div className={styles.mainContainer}>
      {loading ? (
        <p className="loading"> buscando... </p>
      ) : optionSelected ? (
        optionSection(optionSelected)
      ) : (
        <p className="not-found"> Álbum não encontrado. </p>
      )}
    </div>
  );
};

export default ViewCardSelected;
