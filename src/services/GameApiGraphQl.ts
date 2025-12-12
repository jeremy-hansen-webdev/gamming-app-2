import axios from 'axios';

const GRAPHQL_ENDPOINT =
  'https://darkgoldenrod-wren-685563.hostingersite.com/graphql';

export const wpGraphqlClient = axios.create({
  baseURL: GRAPHQL_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function testGraphQL() {
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

testGraphQL();
