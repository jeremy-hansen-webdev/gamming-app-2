import { useEffect, useState } from 'react';
import { GamesData } from '../services/getGames';
import type { Games } from '../services/Types';

export function useGames() {
  const [games, setGames] = useState<Games[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError('');

        const gameService = new GamesData();
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
  }, []);

  return { games, loading, error };
}
