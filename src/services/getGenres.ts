import { wpGraphqlClient } from './GameApiGraphQl.ts';
import type { Genre, RawGenreNode } from './Types.ts';

export class GenreQueries {
  async getGenres(): Promise<Genre[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Genres {
          genres {
            nodes {
              id
              databaseId
              title
              slug
              genreFields {
                image
              }
            }
          }
        }
      `,
    });
    const resData: RawGenreNode[] = res.data?.data?.genres?.nodes;
    const formatData = resData.map((data) => ({
      id: data.id,
      databaseId: data.databaseId,
      title: data.title,
      slug: data.slug,
      image: data.genreFields.image,
    }));

    return formatData;
  }
}

(async () => {
  const genreQueries = new GenreQueries();
  const genreData = await genreQueries.getGenres();
  console.log(genreData);
})();
