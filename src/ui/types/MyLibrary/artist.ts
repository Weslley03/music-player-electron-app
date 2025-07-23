import type { Music } from "../music";

export type Artist = {
  id: number;
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
