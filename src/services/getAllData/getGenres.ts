import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Genre, RawGenreNode } from '../formatters/Types.ts';

export async function getGenres(): Promise<Genre[]> {
  const res = await wpGraphqlClient.post('', {
    query: /* GraphQL */ `
      query Genre {
        genres {
          nodes {
            id
            databaseId
            name
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

  return formatters.genres(resData);
}
