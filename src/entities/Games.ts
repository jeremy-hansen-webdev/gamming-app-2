import type { PageInfoHeader } from './PageInfoHeader';
import type { RawPlatformNode } from './Platform';
import type { Platform } from './Platform';
import type { RawGenreNode } from './Genre';
import type { Genre } from './Genre';

export interface Games {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  image: string;
  rating: number;
  genre: Genre[];
  platform: Platform[];
}
export interface GameNodeHeader {
  pageInfo: PageInfoHeader;
  nodes: Games[];
} // Raw GraphQL response types

export interface RawGameNode {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  gameFields: {
    image: string;
    rating: number;
  };
  genres: {
    nodes: RawGenreNode[];
  };
  platforms: {
    nodes: RawPlatformNode[];
  };
}
export interface RawGameNodeHeader {
  games: {
    pageInfo: PageInfoHeader;
    nodes: RawGameNode[];
  };
}
