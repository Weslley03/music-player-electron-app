import { apiLocal } from "../api";
import type { LibraryOption } from "../../types/MyLibrary/library-type";
import type { User } from "../../types/user-type";
import { handleError } from "../../helpers/error-handling-helper";
import type { ResponseApi } from "../../types/response-api-type";

export const getUserInformations = async (userId: string): Promise<User> => {
  try {
    const response = await apiLocal.get<ResponseApi<User>>(`/user/informations/${userId}`);
    if (response.status !== 200) throw Error(response.data.message);
    return response.data.response;
  } catch (err) {
    return handleError<User>('erro ao buscar informações do usuário.', err, {} as User);
  };
};

export const getUserLibrary = async (): Promise<LibraryOption> => {
  try {
    const response = await apiLocal.get<ResponseApi<LibraryOption>>(`/library/by/${import.meta.env.USER_ID}`);
    return response.data.response;
  } catch (err) {
    return handleError<LibraryOption>('erro ao buscar biblioteca do usuário.', err, {} as LibraryOption);
  };
};