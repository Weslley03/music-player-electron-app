import { handleError } from "../../helpers/error-handling-helper";
import type { Music } from "../../types/music-type";
import type { ResponseApi } from "../../types/response-api-type";
import { apiLocal } from "../api";

export const getMusicByAlbumId = async (albumId: string) => {
  try {
    const response = await apiLocal.get<ResponseApi<Music[]>>(`music/album/${albumId}`);
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possível encontrar as músicas desse album.', err, []);
  }
};

export const getMusicByArtistId = async (artistId: string) => {
  try {
    const response = await apiLocal.get<ResponseApi<Music[]>>(`music/artist/${artistId}`);
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possível encontrar as músicas desse artista.', err, []);
  }
};