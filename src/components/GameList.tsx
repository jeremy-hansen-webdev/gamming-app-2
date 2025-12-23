import { useState } from 'react';
import { useGamesFilter } from '../hooks/useGameFilterHookQl';
import type { Games } from '../services/formatters/Types';
import GameCard from './GameCard';
import Platforms from './Platforms';

interface GameListProps {
  genreId: number;
}

const GameList = ({ genreId }: GameListProps) => {
  const [platformId, setPlatformId] = useState(0);
  const { games } = useGamesFilter(genreId, platformId);

  const handlePlatformId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatformId(Number(e.target.value));
  };

  return (
    <>
      <Platforms onChange={handlePlatformId} />
      <div className="flex flex-wrap justify-center gap-10">
        {games.map((game: Games) => (
          <GameCard key={game.databaseId} {...game} />
        ))}
      </div>
    </>
  );
};

export default GameList;
