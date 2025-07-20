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
import musicMock from '../../../../public/mockData/musics/dois-dias-mc-kako-12345678.mp3'
import cardImageMock from '../../assets/userImage.jpeg'
import type { CardType } from '../../types/MyLibrary/CardType';

const cardMock = {
  "id": 1,
  "img": cardImageMock,
  "title": "Dois dias",
  "description": "MC Kako",
  "createdAt": "2025-07-12T10:23:00Z",
  "type": 'album' as CardType
}

const MediaPlayer = () => {
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

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

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

  return (
    <div className={styles.mediaContainer}>
      <div className={styles.content}>
        <audio
          ref={audioRef}
          src={musicMock}
          preload="metadata"
        />

        <div className={styles.currentMusic}>
          <CardOptionMyLibrary
            key={`${cardMock.id}-${cardMock.title.trim()}`}
            imgSrc={cardImageMock}
            title={cardMock.title}
            description={cardMock.description}
            type={cardMock.type}
            hoverColor=''
            reducedUI={false}
          />
        </div>

        <div className={styles.controls}>
          <div className={styles.options}>
            <RoundBottom>
              <BeforeIcon size={16} />
            </RoundBottom>

            <RoundBottom onClick={togglePlay}>
              {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
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