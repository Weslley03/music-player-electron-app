import { handleError } from "../../helpers/error-handling-helper";
import type { Artist, ArtistsResponse } from "../../types/MyLibrary/artist";
import api from "../api";

export const getArtistById = async (artistId: string) => {
  try {
    const response = await api.get<ArtistsResponse>('artists.json');

    return response.data.artists.find(a => {
      return a.id === artistId
    }) ?? {} as Artist;

  } catch (err) {
    return handleError('Não foi possivél encontrar o artista.', err, {} as Artist);
  }
};