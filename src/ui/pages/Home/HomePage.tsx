import styles from './HomePage.module.scss';
import { useAppDispatch } from "../../hooks/redux-hooks";
import { updateCurrentMusic, type currentMusicState } from "../../reducers/currentMusicReducer";
import api from "../../services/api";
import type { MusicsResponse } from "../../types/music";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const getMusic = async () => {
    try {
      const response = await api.get<MusicsResponse>('/musics.json');
      const musicsData = [...response.data.musics];
      return musicsData.find(music => music.id === 2); //mocking selection of a single music
    } catch (err) {
      console.error(err)
    };
  };

  const updateMusic = async () => {
    const music = await getMusic();
    dispatch(updateCurrentMusic(music as currentMusicState))
  };

  return (
    <div className={styles.mainContainer}>
      <p> HomePage! </p>
      <div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={updateMusic}> update current music </button>
        </div>
      </div>
    </div>
  )
};

export default HomePage;