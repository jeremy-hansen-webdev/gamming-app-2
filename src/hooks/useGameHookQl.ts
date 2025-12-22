import { useEffect, useState } from 'react';
import { GamesData } from '../services/getAllData/getGames';
import type { Games } from '../services/formatters/Types';
import { GamesByGenreData } from '../services/filterData/filterByGenre';

export function useGames(genreId: number) {
  const [games, setGames] = useState<Games[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError('');

        const gameService = genreId
          ? new GamesByGenreData(genreId)
          : new GamesData();

        const gameData = await gameService.getGames();
        setGames(gameData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message ?? 'Failed to load games data');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [genreId]);

  return { games, loading, error };
}
