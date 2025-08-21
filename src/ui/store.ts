import { combineReducers, createStore } from 'redux';
import { currentMusicReducer } from './reducers/currentMusicReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  music: currentMusicReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch