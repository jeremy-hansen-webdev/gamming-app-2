import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Games, RawGameNode } from '../formatters/Types.ts';

export class GamesData {
  async getGames(): Promise<Games[]> {
    try {
      const res = await wpGraphqlClient.post('', {
        query: /* GraphQL */ `
          query Games {
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
        `,
      });

      const reqData: RawGameNode[] = res.data?.data?.games?.nodes;
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

(async () => {
  const gameServices = new GamesData();
  const gameData = await gameServices.getGames();
  console.log(gameData);
})();
