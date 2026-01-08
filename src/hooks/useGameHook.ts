import { useInfiniteQuery } from '@tanstack/react-query';
import type { GameNodeHeader, Games } from '../entities/Games';
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

type Page = { pageInfo: GameNodeHeader['pageInfo']; nodes: Games[] };

export function useInfiniteGamesFilter(
  queryOptions?: QueryOptions,
  getById?: number
) {
  const hasGetById = getById != null; // ✅ handles 0 safely

  const hasSearch =
    !!queryOptions && queryOptions.theSearchValue.trim().length > 0;
  const hasFilters =
    !!queryOptions &&
    (queryOptions.genreId !== 0 || queryOptions.platformId !== 0 || hasSearch);

  return useInfiniteQuery<
    Page,
    Error,
    Page,
    (string | number)[],
    string | null
  >({
    queryKey: [
      'games',
      'infinite',
      LIMIT,
      // ✅ include getById so cache doesn't mix
      hasGetById ? 'byId' : 'browse',
      hasGetById ? getById! : 'none',
      // keep filters in key too
      queryOptions?.genreId ?? 0,
      queryOptions?.platformId ?? 0,
      queryOptions?.theSearchValue?.trim() ?? '',
      queryOptions?.sortId ?? 0,
    ],

    initialPageParam: null,

    queryFn: async ({ pageParam }) => {
      let result: GameNodeHeader;

      // ✅ getById overrides everything
      if (hasGetById) {
        result = await getGamesFilter([getById!], LIMIT, pageParam);
        return result; // usually 1 node; no need to sort
      }

      if (hasFilters) {
        const repo = new GameIdRepository();
        const filterService = new GameIdFilterService(repo);

        const ids = await filterService.getIdsIntersection({
          genreId: queryOptions!.genreId,
          platformId: queryOptions!.platformId,
          searchValue: queryOptions!.theSearchValue.trim(),
        });

        result = await getGamesFilter(ids, LIMIT, pageParam);
      } else {
        result = await getGames(LIMIT, pageParam);
      }

      // sort only when it makes sense
      if (result.nodes.length > 1 && queryOptions) {
        const sortGames = new SortGames(result.nodes, queryOptions.sortId);
        return { pageInfo: result.pageInfo, nodes: sortGames.sortData() };
      }

      return result;
    },

    // ✅ IMPORTANT: for getById, you probably want NO next page
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,

    staleTime: 1000 * 60 * 5,
  });
}
