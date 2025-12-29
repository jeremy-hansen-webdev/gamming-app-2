import { useEffect, useState } from 'react';
import { GamesDataFilter } from '../services/filterData/getFilteredGamesById.ts';
import type { Games } from '../services/formatters/Types.ts';
import { GameIdRepository } from '../services/filterData/gameIDRepository.ts';
import { GameIdFilterService } from '../services/filterData/gameIDFilterService.ts';
import { getGames } from '../services/getAllData/getGames.ts';
import { SortGames } from '../services/filterData/sortGames.ts';

interface QueryOptions {
  genreId: number;
  platformId: number;
  theSearchValue: string;
  sortId: number;
}

export function useGamesFilter(queryOptions: QueryOptions) {
  const [games, setGames] = useState<Games[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);

        let gamesList: Games[] = [];
        // Get Genre and PlatformId Query Options
        if (
          queryOptions.genreId ||
          queryOptions.platformId ||
          queryOptions.theSearchValue
        ) {
          const repo = new GameIdRepository();
          const filterService = new GameIdFilterService(repo);
          const ids = await filterService.getIdsIntersection({
            genreId: queryOptions.genreId,
            platformId: queryOptions.platformId,
            searchValue: queryOptions.theSearchValue,
          });
          const svc = new GamesDataFilter(ids);
          gamesList = await svc.getGames();
        } else {
          gamesList = await getGames();
        }

        // Call sort options
        const sortGames = new SortGames(gamesList, queryOptions.sortId);
        gamesList = sortGames.sortData();

        if (isMounted) {
          setGames(gamesList);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load games data'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => {
      isMounted = false;
    };
  }, [queryOptions]); // ✅ BOTH dependencies

  return { games, loading, error };
}
