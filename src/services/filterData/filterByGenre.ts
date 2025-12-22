import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Games, RawGameNode } from '../formatters/Types.ts';

export class GamesByGenreData {
  constructor(private genreId: number) {}

  async getGames(): Promise<Games[]> {
    try {
      const res = await wpGraphqlClient.post('', {
        query: /* GraphQL */ `
          query GamesByGenreDatabaseId($id: ID!) {
            genre(id: $id, idType: DATABASE_ID) {
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
        variables: { id: this.genreId },
      });

      const reqData: RawGameNode[] = res.data?.data?.genre?.games?.nodes;
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
  const svc = new GamesByGenreData(15);
  console.log(await svc.getGames());
})();
