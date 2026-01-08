import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import GameDetail from './GameDetail';
import GameList from './GameList';
import HomePage from './pages/HomePage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <GameList /> },
      { path: '/game/:id', element: <GameDetail /> },
    ],
  },
]);
