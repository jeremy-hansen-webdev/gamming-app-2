import { wpGraphqlClient } from './GameApiGraphQl';
import type { Genre, RawGenreNode } from './Types';

export class GenreQueries {
  async getGenres(): Promise<Genre[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Genres {
          genres {
            nodes {
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
