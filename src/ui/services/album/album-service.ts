import { handleError } from "../../helpers/error-handling-helper";
import type { Album } from "../../types/album-type";
import type { ResponseApi } from "../../types/response-api-type";
import { apiLocal } from "../api";

export const getAlbumById = async (albumId: string): Promise<Album> => {
  try {
    const response = await apiLocal.get<ResponseApi<Album>>(`album/by/${albumId}`);
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possivél encontrar o álbum.', err, {} as Album);
  }
};