import { handleError } from "../../helpers/error-handling-helper";
import type { Artist } from "../../types/artist-type";
import type { ResponseApi } from "../../types/response-api-type";
import { apiLocal } from "../api";

export const getArtistById = async (artistId: string) => {
  try {
    const response = await apiLocal.get<ResponseApi<Artist>>(`artist/by/${artistId}`);
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possivél encontrar o artista.', err, {} as Artist);
  }
};

export const getAllArtists = async (): Promise<Artist[]> => {
  try {
    const response = await apiLocal.get<ResponseApi<Artist[]>>('artist/findAll');
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possivél encontrar os artistas.', err, []);
  }
};

export const addArtistLikeFavorite = async (userId: string, artistsIds: string[]) => {
  try {
    const response = await apiLocal.post<ResponseApi<void>>('/favorite-artist', {
      userId,
      artistId: artistsIds,
    });
    return response.data.response;
  } catch (err) {
    return handleError('Não foi possivél marcar o artista como favorito.', err, []);
  }
};