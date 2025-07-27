import api from "../api";
import type { CardOption, CardsResponse } from "../../types/MyLibrary/Cards";
import type { User, UsersResponse } from "../../types/user-type";
import { handleError } from "../../helpers/error-handling-helper";

export const getUserInformations = async (userId: string): Promise<User> => {
  try {
    const response = await api.get<UsersResponse>('/user.json');
    const userData = [...response.data.users];
    return userData.find(user => user.id === userId) ?? {} as User;
  } catch (err) {
    return handleError<User>('erro ao buscar informações do usuário.', err, {} as User);
  };
};

export const getUserLibrary = async (): Promise<CardOption[]> => {
  try {
    const response = await api.get<CardsResponse>('/user-library.json');

    return [
      ...response.data.albums,
      ...response.data.artists,
      ...response.data.playlist
    ].sort((a: CardOption, b: CardOption) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  } catch (err) {
    return handleError<CardOption[]>('erro ao buscar biblioteca do usuário.', err, []);
  };
};