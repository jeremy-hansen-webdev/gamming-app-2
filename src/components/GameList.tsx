import { useGames } from '../hooks/useGameHookQl';
import type { Games } from '../services/formatters/Types';
import GameCard from './GameCard';

const GameList = () => {
  const { games, loading, error } = useGames();

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {games.map((game: Games) => (
        <GameCard key={game.databaseId} {...game} />
      ))}
    </div>
  );
};

export default GameList;
