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
}

export interface Genre {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  image: string;
}

export interface Platform {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  platformIcon: string;
}

export interface PageInfoHeader {
  endCursor: string | null;
  hasNextPage: boolean;
}

// Raw GraphQL response types
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

export interface RawGenreNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  genreFields: {
    image: string;
  };
}

export interface RawPlatformNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  platformFields: {
    platformIcon: {
      node: {
        sourceUrl: string;
      };
    } | null;
  };
}
