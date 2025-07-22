import mockImage from '../assets/userImage.jpeg';

export type currentMusicState = {
  id: number;
  img: string;
  title: string;
  description: string;
  createdAt: string;
  src: string;
  type: string;
  isValid?: boolean;
};

type currentMusicAction = {
  type: 'UPDATE_CURRENT_MUSIC';
  payload: currentMusicState;
}

const inicialState: currentMusicState = {
  id: 1,
  img: mockImage,
  title: 'no_music_selected',
  description: 'no_music_selected',
  createdAt: 'no_music_selected',
  src: 'no_music_selected',
  type: 'music',
  isValid: false,
};

export const currentMusicReducer = (state = inicialState, action: currentMusicAction) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MUSIC':
      return action.payload;
    default:
      return state;
  };
};

export const updateCurrentMusic = (music: currentMusicState): currentMusicAction => {
  return {
    type: 'UPDATE_CURRENT_MUSIC',
    payload: music,
  }
};