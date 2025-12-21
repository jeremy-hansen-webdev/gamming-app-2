import type { Games, Genre, Platform } from '../services/formatters/Types';
const GameCard = (game: Games) => {
  return (
    <div
      className="flex flex-col bg-zinc-400 overflow-hidden w-2xs rounded-t-2xl pb-2"
      key={game.id}
    >
      <img
        className="w-full h-80 object-cover"
        src={game.image}
        alt="Main Game image"
      />
      <div className="px-4">
        <h2 className="text-2xl">{game.title}</h2>
        <p>Rating: {game.rating}</p>

        <ul className="flex gap-2">
          {game.genre.map((genre: Genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <ul className="flex gap-2">
          {game.platform.map((platform: Platform) => (
            <li key={platform.id}>
              <img src={platform.platformIcon} alt={platform.platformIcon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameCard;
