import {useQuery } from '@tanstack/react-query';
import type { GameNodeHeader, Games } from '../services/formatters/Types';
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
  nextCursor: string;
}



export function useGamesFilter(queryOptions: QueryOptions) {
  const hasSearch = queryOptions.theSearchValue.trim().length > 0;
  const hasFilters =
    queryOptions.genreId !== 0 || queryOptions.platformId !== 0 || hasSearch;

  return useQuery<
    { pageInfo: GameNodeHeader['pageInfo']; nodes: Games[] },
    Error
  >({
    queryKey: [
      'games',
      queryOptions.genreId,
      queryOptions.platformId,
      queryOptions.theSearchValue,
      queryOptions.sortId,
    ],

    queryFn: async () => {
      let gamesList: GameNodeHeader;

      if (hasFilters) {
        const repo = new GameIdRepository();
        const filterService = new GameIdFilterService(repo);

        const ids = await filterService.getIdsIntersection({
          genreId: queryOptions.genreId,
          platformId: queryOptions.platformId,
          searchValue: queryOptions.theSearchValue.trim(),
        });

        gamesList = await getGamesFilter(ids, 5, queryOptions.nextCursor);
      } else {
        gamesList = await getGames(5, queryOptions.nextCursor);
      }

      const sortGames = new SortGames(gamesList.nodes, queryOptions.sortId);

      const sortedGames = {
        pageInfo: gamesList.pageInfo,
        nodes: sortGames.sortData(),
      };

      return sortedGames;
    },

    staleTime: 1000 * 60 * 5,
    // optional: keepPreviousData: true,
  });
}
