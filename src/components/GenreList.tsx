import { useGenres } from '../hooks/useGenreHook';
import type { GenreFilterProp } from './DesktopSidebar';

const GenreList: React.FC<GenreFilterProp> = ({ onGenreClick }) => {
  const { data: genres = [], isLoading, error } = useGenres();

  if (error) {
    return <p>Genre List Couldn't be retrieved</p>;
  }

  if (isLoading) {
    return (
      <div className="inline-flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
      </div>
    );
  }
  return (
    <ul>
      {genres.map((g) => (
        <li className="text-zinc-300" key={g.databaseId}>
          <div
            onClick={() => onGenreClick(g.databaseId)}
            className="flex gap-3 rounded-2xl my-3 p-3 items-center cursor-pointer hover:bg-zinc-600"
          >
            <img className="w-24 h-12 rounded-[10%]" src={g.image} alt="" />
            <h3 className="text-[18px]">{g.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
