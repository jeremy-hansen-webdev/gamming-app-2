import type { IGameIDRepository } from './gameIDRepository';

export type GameIdFilter = {
  genreId?: number;
  platformId?: number;
  searchValue?: string;
};

export class GameIdFilterService {
  constructor(private readonly repo: IGameIDRepository) {}

  async getIdsIntersection(filter: GameIdFilter): Promise<number[]> {
    const results = await Promise.all([
      filter.genreId ? this.repo.getByGenreId(filter.genreId) : null,
      filter.platformId ? this.repo.getByPlatformId(filter.platformId) : null,
      filter.searchValue
        ? this.repo.getBySearchValue(filter.searchValue)
        : null,
    ]);

    // remove inactive filters
    const activeResults = results.filter(
      (r): r is number[] => Array.isArray(r) && r.length > 0
    );

    // no filters → no results (or decide your default behavior)
    if (activeResults.length === 0) return [];

    // intersect all active filters
    return activeResults.reduce((acc, curr) =>
      acc.filter((id) => curr.includes(id))
    );
  }
}
