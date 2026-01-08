export interface Genre {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  image: string;
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
