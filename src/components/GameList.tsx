import { useState, useMemo, useEffect } from 'react';
import { useInfiniteGamesFilter } from '../hooks/useGameHook';
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
    () => ({
      genreId: genreIdState,
      platformId,
      sortId,
      theSearchValue,
    }),
    [genreIdState, platformId, sortId, theSearchValue]
  );

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGamesFilter(queryOptions);
  // @ts-expect-error -- React Query infinite data has pages
  const games = data?.pages.flatMap((p) => p.nodes) ?? [];
  // @ts-expect-error -- React Query infinite data has pages
  const endCursor = data?.pages.at(-1).pageInfo.endCursor ?? '';
  console.log('endCursor', endCursor);

  // const games: Games[]

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
      <div className="flex flex-wrap justify-center gap-10">
        {games.map((game: Games) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
      <button
        className="bg-zinc-400 text-zinc-950 cursor-pointer p-1 rounded-2xl"
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? 'Loading...'
          : hasNextPage
            ? 'Load More'
            : 'No More'}
      </button>
    </>
  );
};

export default GameList;
