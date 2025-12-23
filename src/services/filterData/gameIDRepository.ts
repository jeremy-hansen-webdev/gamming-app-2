import { wpGraphqlClient } from '../GameApiGraphQl.ts';

type IdNode = { databaseId: number };

export interface IGameIDRepository {
  getByGenreId(genreId: number): Promise<number[]>;
  getByPlatformId(platformId: number): Promise<number[]>;
}

export class GameIdRepository implements IGameIDRepository {
  async getByGenreId(genreId: number): Promise<number[]> {
    if (!genreId) return [];

    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query GameIdsByGenre($genreId: ID!) {
          genre(id: $genreId, idType: DATABASE_ID) {
            games {
              nodes {
                databaseId
              }
            }
          }
        }
      `,
      variables: { genreId },
    });

    const node: IdNode[] = res.data?.data?.genre?.games?.nodes ?? [];

    return node.map((n) => n.databaseId);
  }

  async getByPlatformId(platformId: number): Promise<number[]> {
    if (!platformId) return [];

    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query GameIdsByPlatform($platformId: ID!) {
          platform(id: $platformId, idType: DATABASE_ID) {
            games {
              nodes {
                databaseId
              }
            }
          }
        }
      `,
      variables: { platformId },
    });

    const node: IdNode[] = res.data?.data?.platform?.games?.nodes ?? [];
    return node.map((n) => n.databaseId);
  }
}

// (async () => {
//   const gameIds = new GameIdRepository();
//   const filterService = new GameIdFilterService(gameIds);

//   // or behavior
//     const ids = await filterService.getIds({ genreId: 15, platformId: 19 });
//     // and behavior
//     const idsAnd = await filterService.getIdsINtersection({genreId: 15, platformId: 19})
//     console.log(ids);
//     console.log(idsAnd)
// })();
