import { useTheme } from '../hooks/useTheme';

const LightDarkButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button
        onClick={toggleTheme}
        className={`w-14 h-8 flex items-center rounded full p-1 transition cursor-pointer ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-400'}`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white shadow-md transform transition ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};

export default LightDarkButton;
