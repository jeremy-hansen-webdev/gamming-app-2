import type { Genre } from '../entities/Genre';

type Props = {
  genre?: Genre[];
};
const GenreDetails = ({ genre }: Props) => {
  return (
    <div className="flex gap-8 mt-5">
      {genre?.map((g) => (
        <h2 className="text-zinc-200 text-2xl bg-zinc-600 rounded-2xl px-4 py-1">
          {g.name}
        </h2>
      ))}
    </div>
  );
};

export default GenreDetails;
