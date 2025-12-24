import { useState, useMemo, useEffect } from 'react';
import { useGamesFilter } from '../hooks/useGameHookQl';
import type { Games } from '../services/formatters/Types';
import GameCard from './GameCard';
import Platforms from './PlatformsSelector';
import SortOptions from './SortSelector';

interface GameListProps {
  genreId: number;
  searchValue: string;
}

const GameList = ({ genreId, searchValue }: GameListProps) => {
  const [platformId, setPlatformId] = useState(0);
  const [sortId, setSortId] = useState(0);
  const [genreIdState, setGenreId] = useState(genreId);
  const [theSearchValue, setTheSearchValue] = useState(searchValue);

  useEffect(() => {
    setGenreId(genreId);
  }, [genreId]);

  useEffect(() => {
    setTheSearchValue(searchValue);
  }, [searchValue]);

  const queryOptions = useMemo(
    () => ({ genreId: genreIdState, platformId, sortId, theSearchValue }),
    [genreIdState, platformId, sortId, theSearchValue]
  );

  const { games } = useGamesFilter(queryOptions);

  const handlePlatformId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatformId(Number(e.target.value));
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortId(Number(e.target.value));
  };

  const handleReset = () => {
    setPlatformId(0);
    setGenreId(0);
    setSortId(0);
    setTheSearchValue('');
  };

  return (
    <>
      <div className="flex items-center">
        <Platforms onChange={handlePlatformId} platformId={platformId} />
        <SortOptions onChange={handleFilter} sortId={sortId} />
        <button
          onClick={handleReset}
          className="text-zinc-200 text-2xl bg-zinc-600 p-1.5 rounded-2xl ml-2 mb-3 cursor-pointer"
        >
          Reset
        </button>
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
