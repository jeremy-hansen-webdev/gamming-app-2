import { useGames } from '../hooks/useGameHookQl';
import type { Games } from '../services/Types';

const GameList = () => {
  const { games, loading, error } = useGames();

  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
