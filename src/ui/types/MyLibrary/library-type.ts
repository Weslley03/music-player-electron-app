import type { LibraryOptionType } from "./library-option-type";

export interface LibraryOption {
  id: string;
  userId: string;
  itemId: string;
  img: string;
  title: string;
  description?: string;
  createdAt: string;
  type: LibraryOptionType;
}
