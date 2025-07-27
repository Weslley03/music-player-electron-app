import { useEffect, useRef, useState } from 'react';
import styles from './MediaPlayer.module.scss';
import RoundBottom from '../RoundBottom/RoundBottom';
import PauseIcon from '../../icons/PauseIcon';
import PlayIcon from '../../icons/PlayIcon';
import BeforeIcon from '../../icons/BeforeIcon';
import NextIcon from '../../icons/NextIcon';
import RepeatIcon from '../../icons/RepeatIcon';
import colors from '../../utils/colors';
import VolumeIcon from '../../icons/VolumeIcon';
import VolumeOffIcon from '../../icons/VolumeOffIcon';
import CardOptionMyLibrary from '../CardOptionMyLibrary/CardOptionMyLibrary';
import type { CardType } from '../../types/MyLibrary/library-option-type';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { playNextMusic } from '../../reducers/currentMusicReducer';

const MediaPlayer = () => {
  const dispatch = useAppDispatch();
  const { currentMusic, playlist } = useAppSelector((state) => state.music);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [volume, setVolume] = useState(1);
  const volumeSliderRef = useRef<HTMLInputElement>(null);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    event.target.style.setProperty('--progress', `${newVolume * 100}%`);
  };

  const muteButton = () => {
    const newVolume = volume === 0 ? 0.5 : 0;

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    if (volumeSliderRef.current) {
      volumeSliderRef.current.value = newVolume.toString();
      volumeSliderRef.current.style.setProperty('--progress', `${newVolume * 100}%`);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio || !currentMusic) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }

    const percent = (newTime / duration) * 100;
    event.target.style.setProperty('--progress', `${percent}%`);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
  }, [currentMusic])

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (playlist.length > 0) {
        dispatch(playNextMusic());
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch, playlist]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentMusic) return;

    audio.load();
    audio.play()
    setIsPlaying(true)
  }, [currentMusic]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (isRepeating && audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('ended', handleEnded);
    };
  }, [isRepeating]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      const progressPercent = ((audio?.currentTime || 0) / (audio?.duration || 1)) * 100;
      setCurrentTime(audio?.currentTime || 0);
      document.documentElement.style.setProperty('--progress', `${progressPercent}%`);
    };

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.content}>
        <audio
          ref={audioRef}
          src={currentMusic?.src}
          preload="metadata"
        />

        <div className={styles.currentMusic}>
          {currentMusic && (
            <CardOptionMyLibrary
              key={`${currentMusic.id}-${currentMusic.title.trim()}`}
              imgSrc={currentMusic.img}
              title={currentMusic.title}
              description={currentMusic.description}
              type={currentMusic.type as CardType}
              hoverColor=''
              reducedUI={false}
            />
          )}
        </div>

        <div className={styles.controls}>
          <div className={styles.options}>
            <RoundBottom>
              <BeforeIcon size={16} />
            </RoundBottom>

            <RoundBottom onClick={togglePlay}>
              {audioRef.current && !audioRef.current.paused ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            </RoundBottom>

            <RoundBottom>
              <NextIcon size={16} />
            </RoundBottom>

            <RoundBottom onClick={() => setIsRepeating(!isRepeating)}>
              <RepeatIcon size={16} color={isRepeating ? undefined : colors.dark500} />
            </RoundBottom>
          </div>

          <div className={styles.time}>
            <span className={styles.duration}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              step="1"
              value={currentTime}
              onChange={handleSeek}
            />
            <span className={styles.duration}>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.otherControlsOptions}>
          <div className={styles.volume}>
            <div className={styles.volumeIcon} onClick={muteButton}>
              {volume === 0 ? <VolumeOffIcon size={16} /> : <VolumeIcon size={16} />}
            </div>
            <input
              ref={volumeSliderRef}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;