import { wpGraphqlClient } from './GameApiGraphQl.ts';
import type { Games, RawGameNode } from './Types.ts';


export class GamesData {
  constructor(private gameId?: number, private genreId?: number, private platformId?: number){}
  async getGames(): Promise<Games[]> {
    const res = await wpGraphqlClient.post('', {
      query: /* GraphQL */ `
        query Games {
          games {
            nodes {
              id
              databaseId
              title
              slug
              gameFields {
                image
                rating
                genres {
                  nodes {
                    id
                    databaseId
                    ... on NodeWithTitle {
                      title
                    }
                    slug
                    # Your ACF term fields (only if Genre really is that type)
                    ... on Genre {
                      genreFields {
                        image
                      }
                    }
                  }
                }
                platform {
                  nodes {
                    id
                    databaseId
                    ... on NodeWithTitle {
                      title
                    }
                    slug
                  }
                }
              }
            }
          }
        }
      `,
    });

    const reqData: RawGameNode[] = res.data?.data?.games?.nodes;
    const formatData = reqData.map((data) => ({
      id: data.databaseId,
      databaseId: data.databaseId,
      title: data.title,
      slug: data.slug,
      image: data.gameFields.image,
      rating: data.gameFields.rating,
      genre: data.gameFields.genres.nodes.map((g) => ({
        id: g.databaseId,
        title: g.title,
        slug: g.slug,
        image: g.genreFields.image,
      })),
      platform: data.gameFields.platform.nodes.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
      })),
    }));
    return formatData;
  }
}

(async () => {
  const gameServices = new GamesData();
  const gameData = await gameServices.getGames();
  console.log(gameData);
})();
