import { wpGraphqlClient } from '../GameApiGraphQl.ts';

export class FilterByIds {
  constructor(
    private genreId: number = 0,
    private platformId: number = 0
  ) {}

  setGenreId(id: number) {
    this.genreId = id;
  }

  setPlatformId(id: number) {
    this.platformId = id;
  }

  async getAllGameIds(): Promise<number[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Games {
          games {
            nodes {
              databaseId
            }
          }
        }
      `,
    });
    const reqData = res.data?.data?.games?.nodes.map(
      ({ databaseId }: { databaseId: number }) => databaseId
    );
    return reqData;
  }

  private async getGamesFromGenreId(): Promise<number[]> {
    if (this.genreId === 0) {
      return [];
    }
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query IdsByGenreAndPlatform($genreId: ID!) {
          byGenre: genre(id: $genreId, idType: DATABASE_ID) {
            games {
              nodes {
                databaseId
              }
            }
          }
        }
      `,
      variables: { genreId: this.genreId },
    });
    const reqData = res.data?.data?.byGenre?.games?.nodes?.map(
      ({ databaseId }: { databaseId: number }) => databaseId
    );
    if (reqData) {
      return reqData;
    }
    return [];
  }

  private async getGamesFromPlatformId(): Promise<number[]> {
    if (this.platformId === 0) {
      return [];
    }
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query IdsByGenreAndPlatform($platformId: ID!) {
          byPlatform: platform(id: $platformId, idType: DATABASE_ID) {
            games {
              nodes {
                databaseId
              }
            }
          }
        }
      `,
      variables: { platformId: this.platformId },
    });
    const reqData = res.data?.data?.byPlatform?.games?.nodes?.map(
      ({ databaseId }: { databaseId: number }) => databaseId
    );
    if (reqData) {
      return reqData;
    }
    return [];
  }

  async getGamesByFilter(): Promise<number[]> {
    // const getAllIds = await this.getAllGameIds();
    const genreIds = await this.getGamesFromGenreId();
    const platformIds = await this.getGamesFromPlatformId();
    const gameIds = [...genreIds, ...platformIds];
    const unique = [...new Set(gameIds)];
    return unique;
  }
}
