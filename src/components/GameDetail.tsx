import { Link, useParams } from 'react-router-dom';
import type { Games } from '../entities/Games';
import { useInfiniteGamesFilter } from '../hooks/useGameHook';
import PlatformDetail from './PlatformDetail';
import type { Platform } from '../entities/Platform';
import GenreDetails from './GenreDetails';
import type { Genre } from '../entities/Genre';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useInfiniteGamesFilter(undefined, Number(id));
  // @ts-expect-error - pages is correct with useInfiniteGamesFilter
  const game: Games | undefined = data?.pages?.[0].nodes?.[0];
  console.log(game);

  return (
    <div>
      <Link
        to={'/'}
        className="bg-zinc-600 p-4 rounded-2xl text-zinc-200 font-bold"
      >
        All Games
      </Link>
      <div className="mt-7">
        <img className="rounded-t-2xl" src={game?.image} alt="" />
      </div>
      <h1 className="text-zinc-300 text-2xl mt-5">{game?.title}</h1>
      <PlatformDetail platform={game?.platform as Platform[]} />
      <GenreDetails genre={game?.genre as Genre[]} />
    </div>
  );
};

export default GameDetail;
