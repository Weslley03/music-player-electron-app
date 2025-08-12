import type { Album } from "../album-type";
import type { Artist } from "../artist-type";

export interface LibraryOption {
  userId: string;
  albums: Album[];
  artists: Artist[];
}

