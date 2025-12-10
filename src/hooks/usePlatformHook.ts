import { useEffect, useState } from 'react';
import type { Platforms } from '../services/usePlatforms';
import { GamePlatform } from '../services/usePlatforms';

export function usePlatforms() {
  const [plateform, setPlatform] = useState<Platforms[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError('');

        const plateformService = new GamePlatform();
        await plateformService.platformsData;
        setPlatform(plateformService.platformsData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message ?? 'Failed to load games data');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  });
  return { plateform, loading, error };
}
