import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Games, RawGameNode } from '../formatters/Types.ts';

export class GamesByPlatformData {
  constructor(private platformId: number) {}

  async getGames(): Promise<Games[]> {
    try {
      const res = await wpGraphqlClient.post('', {
        query: /* GraphQL */ `
          query GamesByPlatformDatabaseId($id: ID!) {
            platform(id: $id, idType: DATABASE_ID) {
              games {
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
          }
        `,
        variables: { id: this.platformId },
      });

      const reqData: RawGameNode[] = res.data?.data?.platform?.games?.nodes;
      // console.log(reqData);
      if (!reqData) {
        console.error('No data returned from API:', res.data);
        return [];
      }
      return formatters.games(reqData);
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];
    }
  }
}
