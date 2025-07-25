import { combineReducers, createStore } from 'redux';
import { currentMusicReducer } from './reducers/currentMusicReducer';

const rootReducer = combineReducers({
  music: currentMusicReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch