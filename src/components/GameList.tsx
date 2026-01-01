import { useState, useMemo, useEffect } from 'react';
import { useGamesFilter } from '../hooks/useGameHook';
import type { GameNodeHeader, Games } from '../services/formatters/Types';
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
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextCursor, setNextCursor] = useState('');

  useEffect(() => {
    setGenreId(genreId);
  }, [genreId]);

  useEffect(() => {
    setTheSearchValue(searchValue);
  }, [searchValue]);

  const queryOptions = useMemo(
    () => ({
      genreId: genreIdState,
      platformId,
      sortId,
      theSearchValue,
      nextCursor,
    }),
    [genreIdState, platformId, sortId, theSearchValue, nextCursor]
  );
  console.log('Query Options ', queryOptions);
  const {
    data: games = {
      pageInfo: { hasNextPage: false, endCursor: '' },
      nodes: [],
    },
    isLoading,
  } = useGamesFilter(queryOptions);

  useEffect(() => {
    setNextCursor(games.pageInfo.endCursor ?? '');
  }, [games.pageInfo.endCursor]);

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

  if (isLoading) return <h1 className="text-2xl text-zinc-50">Loading...</h1>;

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
      <h1 className="bg-zinc-50">{games.pageInfo.endCursor}</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {games.nodes.map((game: Games) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
      <button className="bg-zinc-400 text-zinc-950 cursor-pointer p-1 rounded-2xl">
        Load More
      </button>
    </>
  );
};

export default GameList;
