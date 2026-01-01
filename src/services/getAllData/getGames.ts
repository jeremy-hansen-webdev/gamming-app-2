import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { GameNodeHeader, RawGameNodeHeader } from '../formatters/Types.ts';

export async function getGames(
  first: number,
  after: string | null
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

const games = await getGames(5, 'YXJyYXljb25uZWN0aW9uOjY4');
console.log(games);
