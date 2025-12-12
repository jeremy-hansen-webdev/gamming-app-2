import axios from 'axios';

const GRAPHQL_ENDPOINT =
  'https://darkgoldenrod-wren-685563.hostingersite.com/graphql';

export const wpGraphqlClient = axios.create({
  baseURL: GRAPHQL_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getGenres() {
  const res = await wpGraphqlClient.post('', {
    query: /* GraphQL */ `
      query Genres {
        genres {
          nodes {
            title
            genreFields {
              name
              image
            }
          }
        }
      }
    `,
  });
  console.log('Genres: ', res.data?.data?.genres?.nodes);
}

async function getPlatforms() {
  const res = await wpGraphqlClient.post('', {
    query: /* GraphQL */ `
      query Platforms {
        platforms {
          nodes {
            title
            platformFields {
              name
            }
          }
        }
      }
    `,
  });
  console.log('Platforms: ', res);
}

async function getGames() {
  const res = await wpGraphqlClient.post('', {
    query: /* GraphQL */ `
      query Games {
        games {
          nodes {
            title
            slug
            gameFields {
              image
              rating
              genres {
                nodes {
                  slug
                  genreFields {
                    name
                    image
                  }
                }
              }
              platform {
                nodes {
                  platformFields {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  console.log('Games:', res.data?.data?.games?.nodes);
}

// Uncomment whichever function you want to test:
// getGenres();
// getGames()
getPlatforms();
