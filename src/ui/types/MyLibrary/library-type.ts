import type { LibraryOptionType } from "./library-option-type";

export interface LibraryOption {
  id: string;
  img: string;
  title: string;
  description?: string;
  createdAt: string;
  type: LibraryOptionType;
}

export interface LibraryResponse {
  albums: LibraryOption[];
  artists: LibraryOption[];
  playlist: LibraryOption[];
}