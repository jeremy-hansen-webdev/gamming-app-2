import { useState, useMemo } from 'react';
import { useGamesFilter } from '../hooks/useGameHookQl';
import type { Games } from '../services/formatters/Types';
import GameCard from './GameCard';
import Platforms from './PlatformsSelector';
import SortOptions from './SortSelector';

interface GameListProps {
  genreId: number;
}

const GameList = ({ genreId }: GameListProps) => {
  const [platformId, setPlatformId] = useState(0);
  const [sortId, setSortId] = useState(0);

  const queryOptions = useMemo(
    () => ({ genreId, platformId, sortId }),
    [genreId, platformId, sortId]
  );

  const { games } = useGamesFilter(queryOptions);

  const handlePlatformId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatformId(Number(e.target.value));
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortId(Number(e.target.value));
  };

  return (
    <>
      <div className="flex">
        <Platforms onChange={handlePlatformId} />
        <SortOptions onChange={handleFilter} />
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {games.map((game: Games) => (
          <GameCard key={game.databaseId} {...game} />
        ))}
      </div>
    </>
  );
};

export default GameList;
