import { useGenres } from '../hooks/useGenreHookQl';
export interface GenreListProps {
  onSelectGenre: (id: number) => void;
}

const GenreList = () => {
  const { genres, loading } = useGenres();

  if (loading) {
    return (
      <div className="inline-flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
      </div>
    );
  }
  return (
    <div>
      {genres.map((g) => (
        <li className="text-zinc-300" key={g.databaseId}>
          <div className="flex gap-3 rounded-2xl my-3 p-3 items-center cursor-pointer hover:bg-zinc-600">
            <img className="w-24 h-12 rounded-[10%]" src={g.image} alt="" />
            <h3 className="text-[18px]">{g.name}</h3>
          </div>
        </li>
      ))}
    </div>
  );
};

export default GenreList;
