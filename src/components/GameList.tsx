import { useGames } from '../hooks/useGameHook';
import type { Filters } from '../services/GameApiClient';

interface Props {
  selectedGenreId?: number;
  selectedPlatformId?: number;
}

const GameList = ({ selectedGenreId, selectedPlatformId }: Props) => {
  const { games, loading, error } = useGames();

  return (
    <div>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
