import { useGames } from '../hooks/useGameHookQl';

const TestData = () => {
  const { games, loading, error } = useGames();

  console.log('Games: ', games);
  console.log('Loading: ', loading);
  console.log('Error : ', error);
  return (
    <div>
      <h1>Testing Data</h1>
    </div>
  );
};

export default TestData;
