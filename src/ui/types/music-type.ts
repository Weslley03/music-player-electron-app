export type Music = {
  id: number;
  img: string;
  title: string;
  description: string;
  createdAt: string;
  src: string;
  type: string;
};

export type MusicsResponse = {
  musics: Music[];
};
