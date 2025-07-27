import { handleError } from "../../helpers/error-handling-helper";
import type { Album, AlbumsResponse } from "../../types/album-type";
import api from "../api";

export const getAlbumById = async (albumId: string): Promise<Album> => {
  try {
    const response = await api.get<AlbumsResponse>('albums.json');

    return response.data.albums.find(a => {
      return a.id === albumId
    }) ?? {} as Album;

  } catch (err) {
    return handleError('Não foi possivél encontrar o álbum.', err, {} as Album);
  }
};