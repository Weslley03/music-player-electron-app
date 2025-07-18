import type { CardType } from "./CardType";

export interface CardOption {
  id: number;
  img: string;
  title: string;
  description?: string;
  createdAt: string;
  type: CardType;
}

export interface CardsResponse {
  albums: CardOption[];
  artists: CardOption[];
  playlist: CardOption[];
}