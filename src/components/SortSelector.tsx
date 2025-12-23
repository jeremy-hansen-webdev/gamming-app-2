interface SortformsProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortOptions = ({ onChange }: SortformsProps) => {
  return (
    <div className="mb-5">
      <label className="text-2xl text-zinc-300 p-2.5" htmlFor="genre">
        Sort
      </label>
      <select
        name="genre"
        id="genre"
        className="bg-zinc-300 rounded-[8%] text-[20px]"
        onChange={onChange}
        defaultValue="selectDefault"
      >
        <option value="selectDefault" disabled>
          Select One
        </option>
        <option value={1}>Title</option>
        <option value={2}>Genre</option>
        <option value={3}>Platform</option>
      </select>
    </div>
  );
};

export default SortOptions;
