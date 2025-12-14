import { useEffect, useState } from 'react';
import { GenreQueries } from '../services/useGenreQl';
import type { Genre } from '../services/Types';

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError('');

        const genreService = new GenreQueries();
        const genreData = await genreService.getGenres();
        setGenres(genreData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message ?? 'Failed to load genres data');
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);
  return { genres, loading, error };
}
