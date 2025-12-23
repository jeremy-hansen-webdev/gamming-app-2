import type { IGameIDRepository } from './gameIDRepository';

export type GameIdFilter = {
  genreId?: number;
  platformId?: number;
};

export class GameIdFilterService {
  constructor(private readonly repo: IGameIDRepository) {}

  async getIds(filter: GameIdFilter): Promise<number[]> {
    const [genreIds, platformIds] = await Promise.all([
      filter.genreId
        ? this.repo.getByGenreId(filter.genreId)
        : Promise.resolve([]),
      filter.platformId
        ? this.repo.getByPlatformId(filter.platformId)
        : Promise.resolve([]),
    ]);
    return [...new Set([...genreIds, ...platformIds])];
  }

  async getIdsINtersection(filter: GameIdFilter): Promise<number[]> {
    const [genreIds, platformIds] = await Promise.all([
      filter.genreId
        ? this.repo.getByGenreId(filter.genreId)
        : Promise.resolve([]),
      filter.platformId
        ? this.repo.getByPlatformId(filter.platformId)
        : Promise.resolve([]),
    ]);
    if (filter.genreId && filter.platformId) {
      const setB = new Set(platformIds);
      return genreIds.filter((id) => setB.has(id));
    }
    return [...new Set([...genreIds, ...platformIds])];
  }
}
