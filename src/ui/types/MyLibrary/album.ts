import type { Music } from "../music";

export type Album = {
  id: number;
  img: string;
  title: string;
  description: string;
  createdAt: string;
  type: 'album';
  musics: Music[];
};

export type AlbumsResponse = {
  albums: Album[];
};
