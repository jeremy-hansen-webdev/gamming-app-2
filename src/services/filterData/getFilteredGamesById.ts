import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Games, RawGameNode } from '../formatters/Types.ts';

export async function getGamesFilter(gameIds: number[]): Promise<Games[]> {
  if (!gameIds?.length) return [];

  try {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query GamesByIds($ids: [ID!]!) {
          games(where: { in: $ids }) {
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
      // ✅ MUST be "ids" to match $ids
      variables: { ids: gameIds },
    });

    // 🔍 log schema errors if any
    if (res.data?.errors?.length) {
      console.error('GraphQL errors:', res.data.errors);
      return [];
    }

    const reqData: RawGameNode[] = res.data?.data?.games?.nodes ?? [];
    return formatters.games(reqData);
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

const res = await getGamesFilter([72, 69, 68]);
console.log(res);
