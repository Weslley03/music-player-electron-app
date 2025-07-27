import type { Music } from '../types/music-type';

export type CurrentMusicState = {
  currentMusic: Music | null;
  playlist: Music[];
};

type CurrentMusicAction =
  | { type: 'UPDATE_CURRENT_MUSIC', payload: Music }
  | { type: 'SET_PLAYLIST', payload: Music[] }
  | { type: 'PLAY_NEXT_MUSIC' };

const inicialState: CurrentMusicState = {
  currentMusic: null,
  playlist: [],
};

export const currentMusicReducer = (state: CurrentMusicState = inicialState, action: CurrentMusicAction) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MUSIC': {
      return {
        ...state,
        currentMusic: action.payload,
      };
    };

    case 'SET_PLAYLIST': {
      return {
        ...state,
        playlist: action.payload,
      }
    };

    case 'PLAY_NEXT_MUSIC': {
      const { playlist, currentMusic } = state;
      if (playlist.length === 0 || !currentMusic) return state;

      const currentIndex = playlist.findIndex(music => music.id === currentMusic.id);

      const nextIndex = currentIndex + 1;

      if (nextIndex < playlist.length) {
        return {
          ...state,
          currentMusic: playlist[nextIndex],
        };
      }

      return state;
    };

    default:
      return state;
  };
};

export const updateCurrentMusic = (music: Music): CurrentMusicAction => {
  return {
    type: 'UPDATE_CURRENT_MUSIC',
    payload: music,
  }
};

export const setPlayList = (musics: Music[]): CurrentMusicAction => {
  return {
    type: 'SET_PLAYLIST',
    payload: musics,
  }
};

export const playNextMusic = (): CurrentMusicAction => {
  return { type: 'PLAY_NEXT_MUSIC' }
};