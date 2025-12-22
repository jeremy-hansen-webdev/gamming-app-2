import { useGames } from '../hooks/useGameHookQl';
import type { Games } from '../services/formatters/Types';
import GameCard from './GameCard';

interface GameListProps {
  genreId: number;
}

const GameList = ({ genreId }: GameListProps) => {
  const { games, loading, error } = useGames(genreId);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-10">
        {games.map((game: Games) => (
          <GameCard key={game.databaseId} {...game} />
        ))}
      </div>
    </>
  );
};

export default GameList;
