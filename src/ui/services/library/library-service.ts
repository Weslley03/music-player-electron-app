import { handleError } from "../../helpers/error-handling-helper";
import type { LibraryOption } from "../../types/MyLibrary/library-type";
import type { ResponseApi } from "../../types/response-api-type";
import { apiLocal } from "../api";

export const addArtistToLibrary = async (userId: string, artistsIds: string[]) => {
  try {
    artistsIds.forEach(async artistId => {
      const response = await apiLocal.post<ResponseApi<LibraryOption[]>>('library', {
        userId,
        refId: artistId,
        type: 'ARTIST',
      });
      return response.data.response;
    });
  } catch (err) {
    return handleError('Não foi possivél encontrar o artista.', err, []);
  }
};

export const getFeedByUserId = async (userId: string): Promise<LibraryOption> => {
  try {
    const response = await apiLocal.get<ResponseApi<LibraryOption>>(`/library/feed/${userId}`);
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possivél encontrar o feed do usuário.', err, {} as LibraryOption);
  }
};