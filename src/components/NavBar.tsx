import { Link } from 'react-router-dom';
import LightDarkButton from './LightDarkButton';

const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-5 bg-amber-300 dark:bg-zinc-950">
      <div className="flex items-center">
        <Link to={'/'}>
          <img className="w-20" src="/Logo/logo.webp" alt="" />
        </Link>
        <h1 className="text-2xl dark:text-zinc-200">Jeremy's Gaming App</h1>
      </div>
      <div>
        <LightDarkButton />
      </div>
    </div>
  );
};

export default NavBar;
