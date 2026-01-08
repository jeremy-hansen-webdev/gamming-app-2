import { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import type { Games } from '../entities/Games';
import { useInfiniteGamesFilter } from '../hooks/useGameHook';
import { useGameQueryStore } from '../store/store';
import GameCard from './GameCard';
import Platforms from './PlatformsSelector';
import SortOptions from './SortSelector';

const GameList = () => {
  const [platformId, setPlatformId] = useState(0);
  const [sortId, setSortId] = useState(0);

  const genreId = useGameQueryStore((s) => s.gameQuery.genreId ?? 0);
  const searchValue = useGameQueryStore((s) => s.gameQuery.searchValue ?? '');

  const setGenreId = useGameQueryStore((s) => s.setGenreId);
  const setSearch = useGameQueryStore((s) => s.setSearch);

  const queryOptions = useMemo(
    () => ({
      genreId,
      platformId,
      sortId,
      theSearchValue: searchValue,
    }),
    [genreId, platformId, sortId, searchValue]
  );

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteGamesFilter(queryOptions);
  // @ts-expect-error -- React Query infinite data has pages
  const games = data?.pages.flatMap((p) => p.nodes) ?? [];

  // const endCursor = data?.pages.at(-1).pageInfo.endCursor ?? '';
  // console.log('endCursor', endCursor);

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
    setSearch('');
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
      <InfiniteScroll
        dataLength={games.length}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<p className="text-zinc-200">Loading more...</p>}
        endMessage={<p className="text-zinc-200">No more games</p>}
      >
        <div className="flex flex-wrap justify-center gap-10">
          {games.map((game: Games) => (
            <Link to={`game/${game.databaseId}`}>
              <GameCard key={game.databaseId} {...game} />
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default GameList;
