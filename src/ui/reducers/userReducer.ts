import type { User } from "../types/user-type";

export type UserState = User;

type UserAction =
  | { type: 'SET_USER', payload: UserState }
  | { type: 'SET_USER_TOKEN', payload: string }

export const initialUserState: UserState = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  token: "",
  firstAccess: true,
};

export const userReducer = (state: UserState = initialUserState, action: UserAction) => {
  switch (action.type) {
    case ('SET_USER'): {
      return {
        ...state,
        ...action.payload,
      }
    }

    case ('SET_USER_TOKEN'): {
      return {
        ...state,
        token: action.payload,
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

export const updateUserToken = (token: string): UserAction => {
  return {
    type: 'SET_USER_TOKEN',
    payload: token,
  }
};