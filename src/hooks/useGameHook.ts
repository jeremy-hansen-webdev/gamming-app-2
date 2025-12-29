import { useQuery } from '@tanstack/react-query';
import type { Games } from '../services/formatters/Types';
import { getGamesFilter } from '../services/filterData/getFilteredGamesById';
import { GameIdRepository } from '../services/filterData/gameIDRepository';
import { GameIdFilterService } from '../services/filterData/gameIDFilterService';
import { getGames } from '../services/getAllData/getGames';
import { SortGames } from '../services/filterData/sortGames';

interface QueryOptions {
  genreId: number;
  platformId: number;
  theSearchValue: string;
  sortId: number;
}

export function useGamesFilter(queryOptions: QueryOptions) {
  const hasSearch = queryOptions.theSearchValue.trim().length > 0;
  const hasFilters =
    queryOptions.genreId !== 0 || queryOptions.platformId !== 0 || hasSearch;

  return useQuery<Games[], Error>({
    queryKey: [
      'games',
      queryOptions.genreId,
      queryOptions.platformId,
      queryOptions.theSearchValue,
      queryOptions.sortId,
    ],

    queryFn: async () => {
      let gamesList: Games[];

      if (hasFilters) {
        const repo = new GameIdRepository();
        const filterService = new GameIdFilterService(repo);

        const ids = await filterService.getIdsIntersection({
          genreId: queryOptions.genreId,
          platformId: queryOptions.platformId,
          searchValue: queryOptions.theSearchValue.trim(),
        });

        console.log('Filters:', queryOptions);
        console.log('Intersection ids:', ids.length, ids.slice(0, 10));

        gamesList = await getGamesFilter(ids);
        console.log('Filtered games returned:', gamesList.length);
      } else {
        gamesList = await getGames();
        console.log('All games returned:', gamesList.length);
      }

      const sortGames = new SortGames(gamesList, queryOptions.sortId);
      return sortGames.sortData();
    },

    staleTime: 1000 * 60 * 5,
    // optional: keepPreviousData: true,
  });
}
