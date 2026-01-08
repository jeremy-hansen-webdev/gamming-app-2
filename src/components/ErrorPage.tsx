import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NavBar from './NavBar';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <div className="bg-zinc-900 flex flex-col text-6xl justify-center min-h-screen items-center">
        <h1 className="text-zinc-300">There has been an error on this page</h1>
        <p className="text-zinc-300">
          {isRouteErrorResponse(error)
            ? 'Error Invalid Page Route.'
            : 'Unexpected Error.'}
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
