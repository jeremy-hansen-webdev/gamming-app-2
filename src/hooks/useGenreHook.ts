import { useQuery } from '@tanstack/react-query';
import type { Genre } from '../services/formatters/Types';
import { getGenres } from '../services/getAllData/getGenres';

export function useGenres() {
  return useQuery<Genre[], Error>({
    queryKey: ['genres'],
    queryFn: async () => {
      return getGenres();
    },
    staleTime: 1000 * 60 * 60, //1hr
  });
}
