import axios from 'axios';

export const wpGraphqlClient = axios.create({
  baseURL: 'https://darkgoldenrod-wren-685563.hostingersite.com/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
});



/* ✅ async entry point */
// (async () => {
//   const gameQueries = new GameQueries();
//   const gameData = await gameQueries.getGames();

//   const genresData = await gameQueries.getGenres()

//   const platformData = await gameQueries.getPlatforms()
//   console.log(gameData);
// })();
