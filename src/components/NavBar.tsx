import LightDarkButton from './LightDarkButton';

const NavBar = () => {
  return (
    <div>
      <LightDarkButton />
      <img className="w-20" src="public\Logo\logo.webp" alt="" />
      <h1 className="bg-amber-200 dark:bg-blue-900">Gaming</h1>
    </div>
  );
};

export default NavBar;
