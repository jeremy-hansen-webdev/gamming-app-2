import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { RawGameNodeHeader } from '../../entities/Games.ts';
import type { GameNodeHeader } from '../../entities/Games.ts';

export async function getGames(
  first: number = 8,
  after: string | null = null
): Promise<GameNodeHeader> {
  try {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query GamesRange($first: Int!, $after: String) {
          games(first: $first, after: $after) {
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
      variables: { first: first, after: after },
    });

    const data = res.data?.data as RawGameNodeHeader;
    return formatters.games(data);
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}

// const games = await getGames(8, null);
// console.log(games);
