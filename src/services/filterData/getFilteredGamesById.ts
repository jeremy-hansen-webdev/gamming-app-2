import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { GameNodeHeader, RawGameNodeHeader } from '../formatters/Types.ts';

export async function getGamesFilter(
  gameIds: (string | number)[],
  first: number,
  after: string | null
): Promise<GameNodeHeader> {
  try {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query GamesByIds($ids: [ID!]!, $first: Int!, $after: String) {
          games(where: { in: $ids }, first: $first, after: $after) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              id
              databaseId
              title
              slug
              gameFields {
                image
                rating
              }
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
              platforms {
                nodes {
                  id
                  databaseId
                  name
                  slug
                  platformFields {
                    platformIcon {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { ids: gameIds, first, after },
    });

    if (res.data?.errors?.length) {
      console.error('GraphQL errors:', res.data.errors);
      return { pageInfo: { endCursor: null, hasNextPage: false }, nodes: [] };
    }

    const data = res.data?.data as RawGameNodeHeader;
    return formatters.games(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    return { pageInfo: { endCursor: null, hasNextPage: false }, nodes: [] };
  }
}

const res = await getGamesFilter([72, 69, 68], 5, null);
console.log(res);
