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