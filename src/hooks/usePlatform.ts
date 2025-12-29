import { useQuery } from '@tanstack/react-query';
import type { Platform } from '../services/formatters/Types';
import { getPlatforms } from '../services/getAllData/getPlatforms';

export function usePlatforms() {
  return useQuery<Platform[], Error>({
    queryKey: ['platforms'],
    queryFn: async () => {
      return getPlatforms();
    },
    staleTime: 1000 * 60 * 60, //hr
  });
}
