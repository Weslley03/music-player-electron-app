import { createStore } from 'redux';
import { counterReducer } from './reducers/counterReducer';

export const store = createStore(counterReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch