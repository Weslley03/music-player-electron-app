import type { User } from "../types/user-type";

export type UserState = User & {
  token?: string; // update here
};

type UserAction =
  { type: 'SET_USER', payload: UserState }

export const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case ('SET_USER'): {
      return {
        ...state,
        ...action.payload,
      }
    }

    default: return state;
  }
};

export const updateUser = (user: UserState): UserAction => {
  return {
    type: 'SET_USER',
    payload: user,
  }
};