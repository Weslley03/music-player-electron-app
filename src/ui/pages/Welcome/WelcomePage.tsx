import { useEffect, useState } from 'react';
import styles from './WelcomePage.module.scss';
import type { Artist } from '../../types/artist-type';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import { addArtistLikeFavorite, getAllArtists } from '../../services/artist/artist-service';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistsSelected, setArtistsSelected] = useState<string[]>([]);

  const navigate = useNavigate();

  const { id } = useAppSelector(state => state.user);

  const selectArtist = (artistId: string) => {
    setArtistsSelected((prevData) => {
      return prevData?.includes(artistId)
        ? prevData.filter(id => id !== artistId)
        : prevData.length === 3 ? prevData : [...prevData, artistId]
    })
  };

  const goToNext = async () => {
    try {
      await addArtistLikeFavorite(id, artistsSelected);
      navigate('/');
    } catch (err) {
      console.error(err)
    }
  };

  // onMounted
  useEffect(() => {
    const fetchArtists = async () => {
      setArtists(await getAllArtists());
    }

    fetchArtists();
  }, [])

  return (
    <div className={styles.content}>
      <span className={styles.title}> welcome </span>
      <span className={styles.description}> Selecione três dos seus artistas favoritos </span>

      {
        artists && artists.length > 0 ? (
          <div className={styles.options}>
            {artists.map(artist => (
              <div
                key={artist.id}
                onClick={() => selectArtist(artist.id)}
                className={`${styles.option} ${artistsSelected.includes(artist.id) ? styles.selected : ''}`}
              >
                <img
                  className={styles.artistCapa}
                  src={`data:image/jpeg;base64,${artist.img}`}
                />
              </div>
            ))}
          </div>
        )
          : (
            <div className={styles.loading}>
              <span> loading... </span>
            </div>
          )
      }

      {artistsSelected.length > 0 && (
        <div className={styles.enviarButton}>
          <DefaultButton text='enviar' onClick={() => goToNext()} />
        </div>
      )}

    </div>
  );
}

export default WelcomePage;