import { usePlatforms } from '../hooks/usePlatform';

interface PlatformsProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  platformId: number;
}

const Platforms = ({ onChange, platformId }: PlatformsProps) => {
  const { data: platforms = [] } = usePlatforms();

  return (
    <div className="mb-5">
      <label className="text-2xl text-zinc-300 p-2.5" htmlFor="platform">
        Platform
      </label>
      <select
        name="platform"
        id="platform"
        className="bg-zinc-300 rounded-[8%] text-[20px]"
        onChange={onChange}
        value={platformId}
      >
        <option value={0} disabled>
          Select One
        </option>
        {platforms.map((platform) => (
          <option value={platform.databaseId} key={platform.databaseId}>
            {platform.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Platforms;
