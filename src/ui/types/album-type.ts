import type { Music } from "./music-type";

export type Album = {
  id: string;
  img: string;
  title: string;
  description: string;
  createdAt: string;
  type: 'album';
  musics: Music[];
};