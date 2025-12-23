import { useEffect, useState } from 'react';
import { GamesDataFilter } from '../services/filterData/getGames';
import type { Games } from '../services/formatters/Types.ts';
import { GameIdRepository } from '../services/filterData/gameIDRepository.ts';
import { GameIdFilterService } from '../services/filterData/gameIDFilterService.ts';
import { GamesData } from '../services/getAllData/getGames.ts';

export function useGamesFilter(genreId: number, platformId: number) {
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
        if (genreId || platformId) {
          const repo = new GameIdRepository();
          const filterService = new GameIdFilterService(repo);
          const ids = await filterService.getIds({
            genreId: genreId,
            platformId: platformId,
          });
          const svc = new GamesDataFilter(ids);
          gamesList = await svc.getGames();
        } else {
          const games = new GamesData();
          gamesList = await games.getGames();
        }

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
  }, [genreId, platformId]); // ✅ BOTH dependencies

  return { games, loading, error };
}
