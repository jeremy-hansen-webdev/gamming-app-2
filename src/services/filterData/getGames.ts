import { formatters } from '../formatters/formatters.ts';
import { wpGraphqlClient } from '../GameApiGraphQl.ts';
import type { Games, RawGameNode } from '../formatters/Types.ts';
import { GameIdRepository } from './gameIDRepository.ts';
import { GameIdFilterService } from './gameIDFilterService.ts';

export class GamesDataFilter {
  constructor(private gameIds: number[]) {}

  async getGames(): Promise<Games[]> {
    if (!this.gameIds?.length) return [];

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
        variables: { ids: this.gameIds },
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
}

(async () => {
  const repo = new GameIdRepository();
  const filterService = new GameIdFilterService(repo);
  const ids = await filterService.getIds({ genreId: 15, platformId: 19 });

  const svc = new GamesData(ids);
  console.log(await svc.getGames());
})();
