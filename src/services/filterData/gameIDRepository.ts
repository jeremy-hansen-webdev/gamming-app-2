import { wpGraphqlClient } from '../GameApiGraphQl.ts';
// import { GameIdFilterService } from './gameIDFilterService.ts';

type IdNode = { databaseId: number };

export interface IGameIDRepository {
  getByGenreId(genreId: number): Promise<number[]>;
  getByPlatformId(platformId: number): Promise<number[]>;
  getBySearchValue(searValue: string): Promise<number[]>;
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

  async getBySearchValue(searchValue: string): Promise<number[]> {
    if (!searchValue) return [];

    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query GameSearch($search: String!) {
          games(where: { search: $search }) {
            nodes {
              databaseId
            }
          }
        }
      `,
      variables: { search: searchValue },
    });

    const node: IdNode[] = res.data?.data?.games?.nodes ?? [];
    return node.map((n) => n.databaseId);
  }
}

// (async () => {
//   const gameIds = new GameIdRepository();

//   const filterService = new GameIdFilterService(gameIds);

//   // or behavior
//   const ids = await filterService.getIds({ genreId: 15, platformId: 19 });
//   // and behavior
//   const idsAnd = await filterService.getIdsIntersection({
//     platformId: 22,
//     searchValue: 'portal',
//   });

//   console.log(idsAnd);
// })();
