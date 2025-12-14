import { usePlatforms } from '../hooks/usePlatformHookQl';

const TestData = () => {
  const { platforms, loading, error } = usePlatforms();

  console.log('Platforms: ', platforms);
  console.log('Loading: ', loading);
  console.log('Error : ', error);
  return (
    <div>
      <h1>Testing Data</h1>
    </div>
  );
};

export default TestData;
