import type { Games } from '../formatters/Types';

export class SortGames {
  constructor(
    private readonly games: Games[],
    private readonly sortOptions: number
  ) {}

  private sortByTitle(): Games[] {
    return [...this.games].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );
  }

  private sortByGenre(): Games[] {
    return [...this.games].sort((a, b) => {
      const genreA = a.genre[0]?.name ?? '';
      const genreB = b.genre[0]?.name ?? '';

      return genreA.localeCompare(genreB, undefined, { sensitivity: 'base' });
    });
  }

  private sortByPlatform(): Games[] {
    return [...this.games].sort((a, b) => {
      const genreA = a.platform[0]?.name ?? '';
      const genreB = b.platform[0]?.name ?? '';

      return genreA.localeCompare(genreB, undefined, { sensitivity: 'base' });
    });
  }

  sortData(): Games[] {
    if (this.sortOptions === 1) return this.sortByTitle();
    if (this.sortOptions === 2) return this.sortByGenre();
    if (this.sortOptions === 3) return this.sortByPlatform();
    return this.games;
  }
}
