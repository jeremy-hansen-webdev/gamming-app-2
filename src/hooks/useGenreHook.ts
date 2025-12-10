import { useEffect, useState } from 'react';
import type { Genres } from '../services/useGenre';
import { GameGenres } from '../services/useGenre';

export function useGenre() {
  const [genre, setGenre] = useState<Genres[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError('');

        const genreService = new GameGenres();
        await genreService.setGameGenres();
        setGenre(genreService.gameGenresData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message ?? 'Failed to load genres');
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);
  return { genre, loading, error };
}
