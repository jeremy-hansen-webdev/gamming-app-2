import { useInfiniteQuery } from '@tanstack/react-query';
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
}

const LIMIT = 8;

export function useInfiniteGamesFilter(queryOptions: QueryOptions) {
  const hasSearch = queryOptions.theSearchValue.trim().length > 0;
  const hasFilters =
    queryOptions.genreId !== 0 || queryOptions.platformId !== 0 || hasSearch;

  return useInfiniteQuery<
    { pageInfo: GameNodeHeader['pageInfo']; nodes: Games[] },
    Error,
    { pageInfo: GameNodeHeader['pageInfo']; nodes: Games[] },
    (string | number)[],
    string | null
  >({
    queryKey: [
      'games',
      LIMIT,
      queryOptions.genreId,
      queryOptions.platformId,
      queryOptions.theSearchValue,
      queryOptions.sortId,
    ],

    initialPageParam: null,

    queryFn: async ({ pageParam }) => {
      let gamesList: GameNodeHeader;

      if (hasFilters) {
        const repo = new GameIdRepository();
        const filterService = new GameIdFilterService(repo);

        const ids = await filterService.getIdsIntersection({
          genreId: queryOptions.genreId,
          platformId: queryOptions.platformId,
          searchValue: queryOptions.theSearchValue.trim(),
        });

        gamesList = await getGamesFilter(ids, LIMIT, pageParam);
      } else {
        gamesList = await getGames(LIMIT, pageParam);
      }

      const sortGames = new SortGames(gamesList.nodes, queryOptions.sortId);

      const sortedGames = {
        pageInfo: gamesList.pageInfo,
        nodes: sortGames.sortData(),
      };

      console.log('sorted Games, ', sortGames);

      return sortedGames;
    },

    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,

    staleTime: 1000 * 60 * 5,
  });
}
