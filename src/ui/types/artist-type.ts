import type { Music } from "./music-type";

export type Artist = {
  id: string;
  img: string;
  title: string;
  description: string;
  createdAt: string;
  type: 'artist';
  musics: Music[];
};

export type ArtistsResponse = {
  artists: Artist[];
};
