import axios from 'axios';

export const wpGraphqlClient = axios.create({
  baseURL: 'https://darkgoldenrod-wren-685563.hostingersite.com/graphql';,
  headers: {
    'Content-Type': 'application/json',
  },
});

class GameQueries {

  async getPlatforms() {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Platforms {
          platforms {
            nodes {
              slug
              platformFields {
                name
              }
            }
          }
        }
      `,
    });

    return res.data?.data?.platforms?.nodes;
  }
}

/* ✅ async entry point */
(async () => {
  const gameQueries = new GameQueries();
  const gameData = await gameQueries.getGames();

  const genresData = await gameQueries.getGenres()

  const platformData = await gameQueries.getPlatforms()
  console.log(gameData);
})();
